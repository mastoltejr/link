import express, {
  Request,
  Response,
  NextFunction,
  Application as ExpressApplication,
  RequestHandler,
  application
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  combine,
  isEmail,
  anyErrors,
  isUnique,
  matching,
  required,
  strongPassword,
  isURL
} from './validation';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const prisma = new PrismaClient();
dotenv.config();

const app: ExpressApplication = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get('/:link', async (req, res, next) => {
  const link = req.params.link;
  const foundLink = await prisma.link.findUnique({ where: { link } });

  if (foundLink) {
    if (foundLink.active === false) {
      return res.status(400).send('Inactive Link');
    }
    prisma.link.update({
      where: { id: foundLink.id },
      data: {
        followCount: foundLink.followCount + 1,
        lastUsed: new Date()
      }
    });
    return res.redirect(foundLink.url);
  }

  return res.status(400).send('Link does not exist');
});

app.post('/createLink', async (req, res, next) => {
  console.log(req.body);
  const { url, oldLinkId } = req.body;

  let errors = {
    url: combine(url, required, isURL)
  };

  if (anyErrors(errors)) {
    res.status(400).send(errors);
    return;
  }

  const newLink = await prisma.link.create({
    data: {
      link: nanoid(8),
      url,
      lastUsed: new Date()
    }
  });
  if (oldLinkId !== undefined)
    await prisma.link.delete({ where: { id: oldLinkId } });
  res.status(200).send(newLink);
});

const expressPort = process.env.EXPRESS_PORT || 3001;
app.listen(expressPort, () =>
  console.log(`Server running on port ${expressPort}`)
);
