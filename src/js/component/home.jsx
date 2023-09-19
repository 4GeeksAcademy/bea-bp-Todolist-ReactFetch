import React, { useEffect } from "react";


//create your first component
const Home = () => {

		return(

			<TodoListWithArray />

		)
			
};



const TodoListWithArray = () => {
	const [todoList, setTodoList] = React.useState(["Hola"])
	const [inputValue, setInputValue] = React.useState([""])
	const ADD_NEW_VALUE_KEY = "Enter"

	const getToDos = () => {
		const newToDoList = [...todoList, {label: 'Label1', done: false }]
		fetch('https://playground.4geeks.com/apis/fake/todos/user/bea')
			.then((data) => data.json().then(jsonData => setTodoList([{label:"Add your first task", done:false}])))
			.catch((error) => {
				fetch('https://playground.4geeks.com/apis/fake/todos/user/bea',{
					method:'POST', 
					body: JSON.stringify(newToDoList),
					headers: {"Content-Type": "application/json"}
				})
			})
	}

	useEffect(() => {
		
		getToDos()
	}, [])

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const addNewElement = async  () => {
		if(!inputValue) return

		const newToDoList = [...todoList, {label: inputValue, done: false }]

		setTodoList(newToDoList)

		await fetch('https://playground.4geeks.com/apis/fake/todos/user/bea',{
			method:'PUT', 
			body: JSON.stringify(newToDoList),
			headers: {"Content-Type": "application/json"}
		})
			
		setInputValue("")
	}

	const handleClick = () => addNewElement()

	const onEnter = (e) => {
		if (e.key === ADD_NEW_VALUE_KEY) addNewElement()
	}

	const deleteElementOnClick = (indexToDelete) => {
		setTodoList(prev => prev.filter((_, index) => index !== indexToDelete))
	}

	const deleteObject = async () => {
		try {
			const deleteResponse = await fetch('https://playground.4geeks.com/apis/fake/todos/user/bea', {
				method: 'DELETE',
				headers: { "Content-Type": "application/json" },
			});
	
			if (!deleteResponse.ok) {
				throw new Error('Error deleting todos');
			}

			const postResponse = await fetch('https://playground.4geeks.com/apis/fake/todos/user/bea', {
				method:'POST', 
				body: JSON.stringify([]),
				headers: {"Content-Type": "application/json"}
			});
	
			if (!postResponse.ok) {
				throw new Error('Error resetting todos');
			}
	
			setTodoList([]);
	
		} catch (error) {
			console.error("There was an error:", error.message);
		}
	};

	  
	  
	  

	return <>

	<div className="centerContent mb-5">

		<h1>- MY TO DO LIST -</h1>

		<div className="input mt-5">

			<input value={inputValue} onChange={handleInputChange} onKeyDown={onEnter} />
			

			<button className="btn btn-success" onClick={handleClick}>Add a task</button>

			{
				todoList.map((todoItem, index) => {
					return (
						<section key={index} style={{display:"flex"}}>
							<p className="todoItem">{`${todoItem.label}`}</p>
							<button className="closeX" onClick={() => deleteElementOnClick(index)}>X</button>
						</section>
					)
				})

			}

			<button className="btn btn-danger" onClick={() => deleteObject()}>Delete all tasks</button>

		</div>

	</div>
</>


}




export default Home;