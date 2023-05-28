
import { News } from '../../entities/news.entity';
import initializedDataSource from './init';

export default async function handler(req: any, res: any) {
  const appDataSource = await initializedDataSource()
  if (!appDataSource) {
    res.status(500).send('Failed to establish connection to database');
    return;
  }
  try {
    const repository = appDataSource.getRepository(News);
    switch (req.method) {
      case 'GET':
        // get all news
        const news = await repository.find();
        res.json(news);
        break;
      case 'POST':
        // const newNews = req.body;
        // await repository.save(newNews);
        // res.json(newNews);
        break;
      // update, delete handlers  
    }
  }
  catch (error) {
    console.error(`An error occurred while processing a request: ${error}`);
    res.status(500).send(`An error occurred while processing a request: ${error}`);
  }

}
