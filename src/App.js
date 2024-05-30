import './App.css';
import Content from './Content';
import { useState, useRef } from 'react';

function App() {
  const userList = ['Soundhar', 'yokesh', 'karthi', 'hari'];
  const initialCommentData = {
    id: 0,
    name: "",
    comment: ""
  };
  
  const [comments, setComments] = useState([initialCommentData]);
  const [users] = useState(userList);
  const [currentComment, setCurrentComment] = useState('');
  const [editId, setEditId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(userList[0]);
  const commentInputRef = useRef(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleComment = (comData) => {
    setCurrentComment(comData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentComment.trim() === '') return;

    if (editId !== null) {
      const updatedComments = comments.map(comment =>
        comment.id === editId ? { ...comment, comment: currentComment } : comment
      );
      setComments(updatedComments);
      setEditId(null);
    } else {
      const newCommentData = {
        id: comments.length === 1 && comments[0].id === 0 ? 1 : comments[comments.length - 1].id + 1,
        name: selectedUser,
        comment: currentComment
      };
      const existingComment = comments.find(comment => comment.id === 0);
      if (existingComment) {
        const updatedComments = comments.map(comment => {
          if (comment.id === 0) {
            return {
              ...comment,
              ...newCommentData
            };
          }
          return comment;
        });
        setComments(updatedComments);
      } else {
        setComments([...comments, newCommentData]);
      }
    }

    setCurrentComment('');
    if (commentInputRef.current) {
      commentInputRef.current.value = '';
    }
  };

  const handleEdit = (id) => {
    const commentToEdit = comments.find(comment => comment.id === id);
    if (commentToEdit) {
      setCurrentComment(commentToEdit.comment);
      setEditId(id);
      setSelectedUser(commentToEdit.name); 
      if (commentInputRef.current) {
        commentInputRef.current.value = commentToEdit.comment;
      }
    }
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
    if (updatedComments.length === 0) {
      setComments([initialCommentData]);
    }
  };

  return (
    <div className="App">
      <Content
        users={users}
        comments={comments}
        handleUserSelect={handleUserSelect}
        selectedUser={selectedUser}
        handleComment={handleComment}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        commentInputRef={commentInputRef}
        handleEdit={handleEdit}
        currentComment={currentComment}
      />
    </div>
  );
}

export default App;
