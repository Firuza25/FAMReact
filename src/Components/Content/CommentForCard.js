import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentForCard = ({ isLoggedIn, username, movieId }) => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3031/cinema/${movieId}`);
        setCommentsList(response.data.data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [movieId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Пожалуйста, войдите в свою учетную запись, чтобы оставить комментарий.');
      return;
    }

    if (comment.trim() !== '') {
      const newComment = {
        text: comment,
        user: username,
      };

      try {
        const updatedComments = [...commentsList, newComment];

        // Получаем текущие данные фильма, чтобы сохранить остальную информацию
        const response = await axios.get(`http://localhost:3031/cinema/${movieId}`);
        const movieData = response.data;

        // Обновляем только поле комментариев, сохраняя остальные данные
        await axios.patch(`http://localhost:3031/cinema/${movieId}`, {
          data: {
            ...movieData.data, // сохраняем все текущие данные в поле data
            comments: updatedComments, // обновляем только комментарии
          },
        });

        setCommentsList(updatedComments);
        setComment('');
      } catch (error) {
        console.error('Error updating comment:', error);
        alert('Не удалось добавить комментарий.');
      }
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Напишите комментарий..."
            rows="4"
            cols="50"
          />
          <button type="submit">Отправить</button>
        </form>
      ) : (
        <p>Чтобы оставить комментарий, войдите в свою учетную запись.</p>
      )}
      <div>
        <h3>Комментарии:</h3>
        <ul>
          {commentsList.map((comment, index) => (
            <li key={index}>
              {comment.text} <br /> <small>— {comment.user}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentForCard;
