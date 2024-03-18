import { Link } from 'react-router-dom';
import useAxios from '@hooks/useAxios';
import TodoListItem from './TodoListItem';
import { ReactCsspin } from 'react-csspin';
import 'react-csspin/dist/style.css';

function TodoList() {
  const { isLoading, data, error } = useAxios({
    url: '/todolist',
  });

  const itemList = data?.items
    .slice(0)
    .reverse()
    .map((item) => <TodoListItem key={item._id} item={item} />);

  return (
    <div id="main">
      <h2>할일 목록</h2>
      {isLoading && <ReactCsspin color="ivory" />}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <div className="todo">
        <Link to="/add">추가</Link>
        <br />
        <div className="search">
          <input type="text" autoFocus />
          <button type="button">검색</button>
        </div>
      </div>
      <ul className="todolist">{itemList}</ul>
    </div>
  );
}

export default TodoList;
