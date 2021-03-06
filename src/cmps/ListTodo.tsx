import React from 'react'
import { MarkableCmp } from './MarkableCmp'
import { Header,Form,Input,List } from 'semantic-ui-react'
import { Markable } from '../interfaces'
import { useForm } from '../services/customHooks'
import {todosService} from '../services/todosService'

interface ListTodoProps {
    markables: Markable[],
    onToggleMarkable(markable: Markable): void,
    onAddMarkable(markableToAdd:Markable):void,
    onDeleteMarkable(markbleId:string):void,
    placeholder: string,

}

export const ListTodo: React.FC<ListTodoProps> = ({ markables, onToggleMarkable,onAddMarkable,onDeleteMarkable,placeholder }) => {
    const [newMarkable, handleChange,clearFildes] = useForm({ txt: '', isDone: null });
     function onsubmitNewMarkable(){
         newMarkable.isDone= false
         newMarkable.id=todosService.makeId()
         onAddMarkable(newMarkable);
         clearFildes()
    }

    return (
        <React.Fragment>
            <Header as='h4' >
                To do:
                </Header>
            <List className="list-markabeles cursor-pointer">
                {markables && markables.map(task => {
                    return <MarkableCmp onDeleteMarkable={onDeleteMarkable} markable={task} onToggleMarkable={onToggleMarkable} key={task.id} />
                })}
            </List>
            <Form onSubmit={onsubmitNewMarkable}>
                <Input placeholder={placeholder} autoComplete="off" name='txt' onChange={handleChange} value={newMarkable.txt} />
            </Form>
        </React.Fragment>

    )
}