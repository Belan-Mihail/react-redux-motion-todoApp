import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/todoSlice";

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  // get value according to initila filterStatus in todoSlice
  const filtersStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch()

  const updateFilter = (e) => {
    // what we pass inside updateFilterStatus as argument will be action.payload. e.target.value === action.payload. this action.payload update state
    dispatch(updateFilterStatus(e.target.value))
  }

  return (
    <div className={styles.appHeader}>
      <Button
        type="button"
        variants="primary"
        onClick={() => setModalOpen(true)}
      >
        Add task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filtersStatus}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
