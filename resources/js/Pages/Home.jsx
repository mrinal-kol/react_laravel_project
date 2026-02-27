import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Home() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            //alert('Data fetched successfully!');
            setUsers(data);
        })
        .catch(err => {
           // alert('Error: ' + err.message);
            console.error(err);
        });
}, []);

    return (
         <>
            {/* CSS */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    body{
                        font-family: Arial, sans-serif;
                        margin:0;
                        background:#f4f6f9;
                        background-color: yellow;
                    }

                    .container{
                        width:90%;
                        margin:40px auto;
                        background:white;
                        padding:30px;
                        border-radius:10px;
                        box-shadow:0 0 15px rgba(0,0,0,0.1);
                    }

                    h1{
                        text-align:center;
                        color:#2c3e50;
                    }

                    h2{
                        color:#34495e;
                        border-bottom:2px solid #eee;
                        padding-bottom:8px;
                        margin-top:40px;
                    }

                    table{
                        width:100%;
                        border-collapse:collapse;
                        margin-top:20px;
                    }

                    th, td{
                        padding:12px;
                        text-align:left;
                        border-bottom:1px solid #ddd;
                    }

                    th{
                        background:#2c3e50;
                        color:white;
                    }

                    tr:hover{
                        background:#f1f1f1;
                    }

                    .day{
                        background:#ecf0f1;
                        padding:15px;
                        margin:15px 0;
                        border-left:5px solid #2c3e50;
                    }

                    ul{
                        margin:10px 0 0 20px;
                    }

                    .footer{
                        text-align:center;
                        margin-top:40px;
                        color:#888;
                    }
                `,
                }}
            />

            <div className="container">
                <h1>Daily Interview Practice Plan</h1>

                <h2>Daily Schedule (4–5 Hours Plan)</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Practice Area</th>
                            <th>What To Do</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>8:00 – 9:00 AM</td>
                            <td>Core Concepts</td>
                            <td>PHP basics, OOP, MySQL queries, JavaScript fundamentals</td>
                        </tr>

                        <tr>
                            <td>9:00 – 10:00 AM</td>
                            <td>Framework Practice</td>
                            <td>Laravel routing, middleware, API, authentication, relationships</td>
                        </tr>

                        <tr>
                            <td>10:00 – 10:30 AM</td>
                            <td>Break</td>
                            <td>Refresh mind</td>
                        </tr>

                        <tr>
                            <td>10:30 – 11:30 AM</td>
                            <td>Coding Practice</td>
                            <td>Solve array, string, sorting, and logic problems</td>
                        </tr>

                        <tr>
                            <td>11:30 – 12:30 PM</td>
                            <td>Database Practice</td>
                            <td>SQL joins, optimization, indexes, query writing</td>
                        </tr>

                        <tr>
                            <td>Evening (1 hr)</td>
                            <td>Interview Q&A Practice</td>
                            <td>HR + technical questions + explain your projects</td>
                        </tr>
                    </tbody>
                </table>

                <h2>Weekly Focus Plan</h2>

                <div className="day">
                    <strong>Monday → PHP + OOP</strong>
                    <ul>
                        <li>Classes and Objects</li>
                        <li>Interfaces and Traits</li>
                        <li>Sessions and Cookies</li>
                        <li>Error Handling</li>
                    </ul>
                </div>

                <div className="day">
                    <strong>Tuesday → Laravel</strong>
                    <ul>
                        <li>MVC Flow</li>
                        <li>Eloquent Relationships</li>
                        <li>API Creation</li>
                        <li>Authentication and Middleware</li>
                    </ul>
                </div>

                <div className="day">
                    <strong>Wednesday → MySQL</strong>
                    <ul>
                        <li>Joins</li>
                        <li>Subqueries</li>
                        <li>Indexes</li>
                        <li>Query Optimization</li>
                    </ul>
                </div>

                <div className="day">
                    <strong>Thursday → JavaScript / React</strong>
                    <ul>
                        <li>ES6 Concepts</li>
                        <li>API Calls</li>
                        <li>State Management</li>
                        <li>DOM Concepts</li>
                    </ul>
                </div>

                <div className="day">
                    <strong>Friday → System Design + Projects</strong>
                    <ul>
                        <li>Explain Your Projects</li>
                        <li>API Structure</li>
                        <li>Database Design</li>
                        <li>Payment Gateway Flow</li>
                    </ul>
                </div>

                <div className="day">
                    <strong>Saturday → Mock Interview</strong>
                    <ul>
                        <li>Self Questioning</li>
                        <li>Record Answers</li>
                        <li>Time-bound Coding</li>
                    </ul>
                </div>

                <div className="day">
                    <strong>Sunday → Revision + Weak Areas</strong>
                    <ul>
                        <li>Review Mistakes</li>
                        <li>Notes Revision</li>
                    </ul>
                </div>

                <h2>Daily HR Practice (15–20 Minutes)</h2>
                <ul>
                    <li>Tell me about yourself</li>
                    <li>Why leaving current job</li>
                    <li>Strengths and weaknesses</li>
                    <li>Explain your project</li>
                    <li>Salary discussion</li>
                    <li>Career goals</li>
                </ul>

                <h2>Best Practice Method</h2>
                <ul>
                    <li>Speak answers loudly</li>
                    <li>Write SQL queries manually</li>
                    <li>Build small features daily</li>
                    <li>Revise previous day topics</li>
                </ul>

                <div className="footer">Interview Preparation Planner</div>
            </div>
        </>
    );
}
