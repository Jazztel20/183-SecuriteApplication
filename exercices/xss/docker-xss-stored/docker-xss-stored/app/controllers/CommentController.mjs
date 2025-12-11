import express from 'express';
import { connectToDatabase } from '../utils/dbUtils.mjs';
import escapeHtml from 'escape-html';


export async function getAllComments() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM t_comment');
    connection.end();
    return rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires :', error);
    throw error;
  }
}


export async function addNewComment(title, comment) {
  try {
    const connection = await connectToDatabase();

    const safeTitle = escapeHtml(title);
    const safeComment = escapeHtml(comment);

    await connection.execute(
      'INSERT INTO t_comment (comTitle, comText) VALUES (?, ?)',
      [safeTitle, safeComment]
    );

    connection.end();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire :', error);
    throw error;
  }
}


