import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react/cjs/react.development';

// step1
// create a functional component
const Skill = () => {
    const [skills, setSkills] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const studentDefaultData = {id: 0, Name: "", Title: "", Email: "" }
    const [student, setStudent] = useState(studentDefaultData);

    useEffect(()=> {
        console.log("useEffect has been executed!");
        // call API get skills list and then set it into the skill list
        //const mySkills = [{id:'A1', title: 'Java SE'}, {id:'A2', title:'Java EE'}];
        //setSkills(mySkills);

    }, [loadData]);


    // step 2: devide component to small components
    const ShowData = (props) => {
        return (
            <Fragment>
                {
                  props.skills.map(
                      skill => (
                        <ul className="row pb-2" key={skill.id}>
                            <li className="form-lable">{skill.title}</li>
                        </ul>
                  ))  
                }
            </Fragment>
        );
    };
    const Form = () => {
        const { register, handleSubmit, formState: {errors} } = useForm();

        const saveData = (data) => {
            console.log("------------------");
            console.log(data);
            console.log("------------------");
            const id = 'A_'+ Math.random().toString(36).substr(2, 9);
            const title = data.title; 
            const skill = { id, title };
            skills.push(skill);
            setLoadData(!loadData); // !false => true
            console.log("SKILLS:" , skills);
        };

        return (
            <Fragment>
                <h5>My Form</h5>
                <br/>
               <form onSubmit={handleSubmit(saveData)}>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" {...register("firstName", { required: true } )}  placeholder="Enter First Name" />
                            {errors.title && <span className="text-danger">Firstname is required!</span>}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" {...register("lastName", { required: true } )}  placeholder="Enter Last Name" />
                            {errors.title && <span className="text-danger">Lastname is required!</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <input type="text" className="form-control" {...register("email", { required: true } )}  placeholder="Enter Email" />
                            {errors.title && <span className="text-danger">Email is required!</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <input type="text" className="form-control" {...register("title", { required: true } )}  placeholder="Enter Title" />
                            {errors.title && <span className="text-danger">Title is required!</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <br/>
                            <button type="submit" className="btn btn-success">+</button>
                        </div>
                    </div>
                </form> 
            </Fragment>
        );
    };

    const TableHeader = () => {
        return (
        <thead>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
        </thead>
        );
    };
    const TableAction = (props) => {

        const showData = () => {
            setShowDetails(true);
            console.log("SHOW DATA",props.student);
            setStudent(props.student);
        };
    
        return (<button type="button" className="btn btn-primary" onClick={showData} >Details</button>);
    
    };


    const TableRow = (props) => {
        return(
        <tbody>
            {
                props.list.map((student) => (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td><TableAction student={student} /></td>
                </tr>
                    ) )
            }
        </tbody>
        );
    };

    const ShowStudentDetails = () => {

        console.log("Pressed", showDetails);
        if(showDetails){
            return(
                <div className="card">
                    <div className="card-header bg-info text-white">
                        Student Information
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Country and City</h5>
                        <p className="card-text">ID: {student.id}</p>
                        <p className="card-text">Name: {student.firstName}</p>
                        <p className="card-text">Email: {student.email}</p>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-danger" onClick={()=> {setShowDetails(false); setStudent(studentDefaultData)}}>Close</button>
                    </div>
                </div>
            );
        } else {
            return ("");
        }
        
    
    };

    return (
        <div className="container">
            <h3>Fullstack Developer Skills</h3>
            <ShowData skills={skills} />
            <Form />
            <br/>
            <table className="table .table-striped">
            <TableHeader />
            <TableRow list={skills} />
            </table>
        </div>
    );
};

export default Skill;