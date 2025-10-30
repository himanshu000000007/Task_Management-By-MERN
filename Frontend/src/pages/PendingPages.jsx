import React, { useState, useMemo } from 'react';
import { layoutClasses } from '../assets/dummy';
import { ListChecks, Filter, Clock, Plus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';

// const API_BASE = 'http://localhost:4000/api/tasks';

const PendingPage = () => {
  const { tasks = [], refreshTasks } = useOutletContext();

  const [sortBy, setSortBy] = useState('newest');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sortedPendingTasks = useMemo(() => {
    const filtered = tasks.filter(
      (t) =>
        !t.completed ||
        (typeof t.completed === 'string' && t.completed.toLowerCase() === 'no')
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);

      const order = { high: 3, medium: 2, low: 1 };
      return order[b.priority?.toLowerCase()] - order[a.priority?.toLowerCase()];
    });
  }, [tasks, sortBy]);

  return (
    <div className={layoutClasses.container}>
      <div className={layoutClasses.headerWrapper}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ListChecks className="text-purple-500" />
            Pending Tasks
          </h1>

          <p className="text-sm text-gray-500 mt-1 ml-7">
            {sortedPendingTasks.length} task
            {sortedPendingTasks.length !== 1 && 's'} needing your attention
          </p>
        </div>

        <div className={layoutClasses.sortBox}>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Filter className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Sort by:</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={layoutClasses.select}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
          </select>
        </div>
      </div>

      <div className={layoutClasses.addBox} onClick={() => setShowModal(true)}>
        <div className="flex items-center justify-center gap-3 text-gray-500 hover:text-purple-600 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200">
            <Plus className="text-purple-500" size={18} />
          </div>
          <span className="font-medium">Add New Task</span>
        </div>
      </div>

      {/* ✅ TASK LIST WITH BORDER */}
      <div className="space-y-4 mt-4">
        {sortedPendingTasks.length === 0 ? (
          <div className={layoutClasses.emptyState}>
            <div className="max-w-xs mx-auto py-6 text-center">
              <div className={layoutClasses.emptyIconBg}>
                <Clock className="w-8 h-8 text-purple-500 mx-auto" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                All caught up!
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                No pending tasks - great work!
              </p>

              <button
                onClick={() => setShowModal(true)}
                className={layoutClasses.emptyBtn}
              >
                Create New Task
              </button>
            </div>
          </div>
        ) : (
          sortedPendingTasks.map((task) => (
            <div
              key={task._id || task.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-white"
            >
              <TaskItem
                task={task}
                showCompleteCheckbox
                onEdit={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}
                onRefresh={refreshTasks}
              />
            </div>
          ))
        )}
      </div>

      <TaskModal
        isOpen={!!selectedTask || showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTask(null);
          refreshTasks();
        }}
        taskToEdit={selectedTask}
        onSave={refreshTasks}
      />
    </div>
  );
};

export default PendingPage;
