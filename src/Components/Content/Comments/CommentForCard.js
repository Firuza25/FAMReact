import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import './CommentStyle.css'; 

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
        const response = await axios.get(`http://localhost:3031/cinema/${movieId}`);
        const movieData = response.data.data;
        const updatedComments = [...movieData.comments, newComment];

        await axios.patch(`http://localhost:3031/cinema/${movieId}`, {
          data: {
            ...movieData,
            comments: updatedComments,
          },
        });

        setCommentsList(updatedComments);
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('Не удалось добавить комментарий.');
      }
    }
  };


  const handleDelete = async (commentIndex) => {
    try {
      const response = await axios.get(`http://localhost:3031/cinema/${movieId}`);
      const movieData = response.data.data;
      const updatedComments = movieData.comments.filter((_, index) => index !== commentIndex);

      await axios.patch(`http://localhost:3031/cinema/${movieId}`, {
        data: {
          ...movieData,
          comments: updatedComments,
        },
      });

      setCommentsList(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Не удалось удалить комментарий.');
    }
  };


  const handleUpdate = async (commentIndex, updatedText) => {
    try {
      const response = await axios.get(`http://localhost:3031/cinema/${movieId}`);
      const movieData = response.data.data;

      const updatedComments = movieData.comments.map((comment, index) =>
        index === commentIndex ? { ...comment, text: updatedText } : comment
      );

      await axios.patch(`http://localhost:3031/cinema/${movieId}`, {
        data: {
          ...movieData,
          comments: updatedComments,
        },
      });

      setCommentsList(updatedComments);
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Не удалось обновить комментарий.');
    }
  };

  return (
    <div className="comment-container">
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Напишите комментарий..."
            rows="4"
          />
          <button type="submit" className='sub'>Отправить</button>
        </form>
      ) : (
        <p>Чтобы оставить комментарий, войдите в свою учетную запись.</p>
      )}

      <div>
        <h3>Комментарии:</h3>
        <ul className="comment-list">
          {commentsList.map((comment, index) => (
            <li key={index}>
              <div className="user-info">
                <UserOutlined style={{ fontSize: 20, color: '#888' }} />
                <span>{comment.user}</span>
              </div>
              <p>{comment.text}</p>
              {isLoggedIn && comment.user === username && (
                <div className="icon-buttons">
                  <EditOutlined
                    onClick={() => handleUpdate(index, prompt('Измените комментарий:', comment.text))}
                  />
                  <DeleteOutlined onClick={() => handleDelete(index)} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentForCard;
