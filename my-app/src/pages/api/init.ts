import { DataSource } from "typeorm";
import sqlite3 from 'sqlite3'
import { User } from "@/entities/user.entity";
import { News } from "@/entities/news.entity";

const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: false,
  entities: [User, News],
  driver: sqlite3,
});

async function initializeDataSource(): Promise<DataSource | null> {
  try {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }
    return appDataSource;
  } catch (error) {
    console.log('Failed to establish connection to database:', error);
    return null;
  }
}


export default initializeDataSource