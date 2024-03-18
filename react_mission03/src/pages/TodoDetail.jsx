import { Link, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import PropTypes from 'prop-types';
import { ReactCsspin } from 'react-csspin';

TodoDetail.propTypes = {
  todoDetail: PropTypes.shape({
    _id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    done: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

function TodoDetail() {
  const params = useParams();
  const detailId = params._id;
  const { isLoading, data, error } = useAxios({
    url: `todolist/${detailId}`,
  });
  const todoDetail = data?.item ?? {};

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>

      {isLoading && <ReactCsspin spinStyle="cp-morph" color="bisque" />}
      {error && <p style={{ color: 'blueviolet' }}>{error.message}</p>}
      <div className="todo">
        <div>{todoDetail.title}</div>
        <div>{todoDetail.content}</div>
        <div>
          상태 :{' '}
          {todoDetail.done === undefined
            ? ''
            : todoDetail.done
            ? '완료'
            : '미완료'}
        </div>
        <div>작성일 : {todoDetail.createdAt}</div>
        <div>수정일 : {todoDetail.updatedAt}</div>
        <Link to="/edit">수정</Link>
        <Link to="/list">목록</Link>
      </div>
    </div>
  );
}

export default TodoDetail;
