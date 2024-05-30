import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import checkCircle from './icons/check-circle.svg';
import person from './icons/person.svg';
import trash from './icons/trash3.svg';
import x from './icons/x-lg.svg';
import note from './icons/sticky.svg';
import userImage from './icons/userImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck , faTrashCan , faNoteSticky , faUser , faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faX , faPencil} from '@fortawesome/free-solid-svg-icons';

function Content({ comments, users, handleUserSelect, selectedUser, handleComment, handleSubmit, handleDelete, commentInputRef, handleEdit, currentComment }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-6 mx-auto mt-5 border border-dark border-light rounded-4">
          <div className="mx-4 my-4">
            <div className="row my-4">
              <div className="col-6 col-md-6">
                {(comments[0].id >= 1 ) 
                   ? <FontAwesomeIcon icon={faCircleCheck} className="float-sm-start ms-1 mt-2 text-danger" />
                   : console.log(comments.length)
              
                 }
              </div>
              <div className="col-6 col-md-6">
                <div className="float-sm-end me-1">
                  <FontAwesomeIcon icon={faTrashCan} className="me-2 text-danger" />
                  <FontAwesomeIcon icon={faX} className="me-2 text-danger" />
                </div>
              </div>
            </div>
            <input type="text" className="form-control border border-dark rounded-pill w-85 my-2" placeholder="" />
            <input type="date" className="form-control border border-dark rounded-pill my-3" placeholder="" />
            <div className="d-md-flex justify-content-between my-3">
             <span className="my-2"><FontAwesomeIcon icon={faUser} className="mt-1 me-3 text-danger" />User</span> 
              <div className="dropdown ms-5">
                <button className="btn text-success border border-dark dropdown-rounded-pill dropdown-toggle d-flex" data-bs-toggle="dropdown">
                  <img className="rounded-pill p-1" src={userImage} alt="User image" />
                  <p className="m-0 p-0 mt-1 fw-bolder">{selectedUser}</p>
                </button>
                <div className="dropdown-menu dropdown-menu-rounded-pill">
                  {users.map((user, index) => (
                    <a key={index} className="dropdown-item" href="#" onClick={() => handleUserSelect(user)}>{user}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-md-flex justify-content-between my-3">
               <FontAwesomeIcon icon={faNoteSticky} className="my-3 text-danger" />
              <p className="m-0 p-0 ms-3 mt-3 mb-3 me-4">Note:</p>
              <textarea className="form-control rounded-4 mt-3" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
            <hr />
            <div>
              <p className="text-start fw-bolder">Comments</p>
            </div>
            {comments[0].id !== 0
              ? comments.map((comment) => (
                <div key={comment.id} className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <img className="rounded-pill" src={userImage} alt="User image" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="m-0 p-0 text-start text-success fw-bolder">{comment.name}</p>
                    <div className="text-start">{comment.comment}</div>
                  </div>
                  <FontAwesomeIcon icon={faTrashCan} className="me-2 text-danger" onClick={() => handleDelete(comment.id)}/>
                  <FontAwesomeIcon icon={faPencil} className="me-2 text-danger" onClick={() => handleEdit(comment.id)}/>
                </div>
              ))
              : <div>No comments</div>
            }
            <div className="d-flex align-items-center text-start">
              <div className="flex-shrink-0">
                <img className="rounded-pill" src={userImage} alt="User image" />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="position-relative">
                  <input type="text" ref={commentInputRef} placeholder="Write comment..." value={currentComment} onChange={(e) => handleComment(e.target.value)} className="form-control border border-dark rounded-pill my-3"/>
                  <FontAwesomeIcon icon={faPaperPlane} className="position-absolute top-50 end-0 translate-middle text-danger me-2"  onClick={(e) => handleSubmit(e)} disabled={!currentComment.trim()}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
