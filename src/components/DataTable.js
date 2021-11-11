import React, { useState } from 'react';

const DataTable = () => {

    const initialData = [
        {id: 1, firstName: "Mehrdad", lastName: "Javan", age: 32, birthDate: "1989-02-27", country: "Sweden", city: "Växjö" },
        {id: 2, firstName: "Test", lastName: "Test", age: 30, birthDate: "1989-02-28", country: "Sweden", city: "Växjö" }
    ];
    
    const [studentList, setStudentList] = useState(initialData);
    const [showDetails, setShowDetails] = useState(false);
    const studentDefaultData = {id: 0, firstName: "", lastName: "", age: 0, birthDate: "", country: "", city: "" }
    const [student, setStudent] = useState(studentDefaultData);
    console.log("The main function", student);

    const TableHeader = () => {
        return (
        <thead>
            <td>Id</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Age</td>
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
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.age}</td>
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
                        <p className="card-text">Name: {student.firstName} {student.lastName}</p>
                        <p className="card-text">BirthDate: {student.birthDate}</p>
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
            <table className="table .table-striped">
                <TableHeader />
                <TableRow list={studentList} />
            </table>
            <br/>
            <ShowStudentDetails />
            

        </div>
    );
};

export default DataTable;