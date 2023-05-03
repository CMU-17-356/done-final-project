import moment, {Moment} from "moment";
import HistoryCard from "./HistoryCard";
import {useEffect, useMemo, useState} from "react";


type ICompletedTodo = ITodo & {
    date: Date;
    photo: string;
}

type ITaskOfDate = {
    date: Date;
    tasks: ICompletedTodo[];
}

export const CalendarView = ({tasks}: { tasks: ITodo[] }) => {


    const [dirty, setDirty] = useState(false);
    const [month, setMonth] = useState(new Date());
    const [flatTasks, setFlatTasks] = useState<ICompletedTodo[]>([]);
    const [tasksOfDate, setTasksOfDate] = useState<ITaskOfDate[]>([]);


    const tasksTotal = useMemo(() => {
        return flatTasks.length;
    }, [flatTasks]);
    const sequentCompletedTasksTotal = useMemo(() => {
        let total = 0;
        let max = 0;
        let lastDate: Moment | null = null;
        let completedDates: string[] = [];
        flatTasks.forEach(item => {
            const itemDateString = moment(item.date).format('YYYY-MM-DD');
            if (!completedDates.includes(itemDateString)) {
                completedDates.push(itemDateString);
            }
        });
        completedDates.forEach(dateString => {
           if (lastDate === null) {
               total = 1;
               max = 1;
               lastDate = moment(dateString);
           } else {
               if (moment(dateString).diff(lastDate, 'days') === 1) {
                   lastDate = moment(dateString);
                   total ++;
                   if (total > max) {
                       max = total;
                   }
               } else {
                   if (total > max) {
                       max = total;
                   }
                   total = 1;
                   lastDate = moment(dateString);
               }
           }
        });

        return max;

    }, [flatTasks]);

    useEffect(() => {

        let newFlatTasks: ICompletedTodo[] = [];
        tasks.forEach(task => {
            const completed = task.completed;
            completed.forEach(completedItem => {
                newFlatTasks.push({
                    ...task,
                    ...completedItem
                })
            });
        });

        newFlatTasks = newFlatTasks.filter(item => {
            return moment(item.date).isSame(moment(month), 'month');
        })

        newFlatTasks = newFlatTasks.sort((prev, next) => {
            return moment(prev.date).isAfter(next.date) ? 1 : -1;
        });

        setFlatTasks(newFlatTasks);

    }, [month, tasks]);

    useEffect(() => {
        const newTasksOfDate:ITaskOfDate[] = [];
        flatTasks.forEach(task => {
            const dateTasks = newTasksOfDate.find(item => {
                return moment(item.date).isSame(moment(task.date), 'day')
            });
            if (!dateTasks) {
                newTasksOfDate.push({
                    date: task.date,
                    tasks: [task]
                })
            } else {
                dateTasks.tasks.push(task)
            }
        });
        setTasksOfDate(newTasksOfDate);
    }, [flatTasks]);





    const renderTasks = () => {
        return tasksOfDate.map(dateItem => {
            return (
                <div className={'card d-inline-block mt-2 me-2'} key={dateItem.date.toDateString()}>
                    <div className={'card-header'}>
                        <h3 className={'card-title text-dark'}>
                            {moment(dateItem.date).format('MMM DD')}
                        </h3>
                    </div>
                    <div className={'card-body d-flex'}>
                        {dateItem.tasks.map(task => {
                            return (
                                <HistoryCard
                                    key={task._id + task.date}
                                    _id={task._id}
                                    name={task.name}
                                    date={moment(task.date).format('MMM DD')}
                                    description={task.description}
                                    image={task.photo}/>
                            )
                        })}
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <input
                value={moment(month).format('YYYY-MM')}
                onChange={e => {
                    setMonth(new Date(e.target.value));
                    setDirty(true);
                }}
                type={'month'} />
            {tasksOfDate.length > 0 && (
                <div className={'d-flex'}>
                    {renderTasks()}
                </div>
            )}

            {tasksOfDate.length === 0 && dirty &&(
                <h2 className={'alert alert-warning mt-3'}>
                    Sorry, No Tasks For {moment(month).format('YYYY MMM')}
                </h2>
            )}

            <div className={'mt-2 d-flex'}>
                <div className={'card me-2'} style={{width: '15rem'}}>
                    <div className={'card-body'}>
                        <h1 className={'text-info'}>
                            {sequentCompletedTasksTotal}
                        </h1>
                        <h5 className={'text-dark'}>days</h5>
                        <h4 className={'text-secondary'}>
                            Continuously completed task days
                        </h4>
                    </div>
                </div>

                <div className={'card me-2'} style={{width: '15rem'}}>
                    <div className={'card-body'}>
                        <h1 className={'text-danger'}>{tasksTotal}</h1>
                        <h4 className={'text-secondary'}>Total task completed</h4>
                    </div>
                </div>
            </div>
        </div>

    )
}