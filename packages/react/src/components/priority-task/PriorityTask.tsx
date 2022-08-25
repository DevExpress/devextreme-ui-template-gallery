import { TaskProp } from '../../shared/types/task';
import './PriorityTask.scss';

const PriorityTask = ({ text }: TaskProp) => (
    <div className={`priority-task priority-${text.toLowerCase()}`}>
        <div className="separator-task"></div>
        <span>{text}</span>
    </div>
);

export default PriorityTask;