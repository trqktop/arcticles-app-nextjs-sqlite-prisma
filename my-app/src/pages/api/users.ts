
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import sqlite3 from 'sqlite3';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import initializedDataSource from './init';


export default async function handler(req: any, res: any) {
  const appDataSource = await initializedDataSource()
  if (!appDataSource) {
    res.status(500).send('Failed to establish connection to database');
    return;
  }
  try {
    const repository = appDataSource.getRepository(User);
    switch (req.method) {
      case 'GET':
        const users = await repository.find();
        res.json(users);
        break;
      case 'POST':
        // const newUser = req.body;
        // await repository.save(newUser);
        // res.json(newUser);
        break;
      // update, delete handlers  
    }
  }
  catch (error) {
    console.error(`An error occurred while processing a request: ${error}`);
    res.status(500).send(`An error occurred while processing a request: ${error}`);
  }

}