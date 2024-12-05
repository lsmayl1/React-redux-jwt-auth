import React, { useEffect, useState } from "react";
import { useGetProfileQuery, useGetUsersQuery } from "../redux/apiSlice";
import { Link, useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const { data:profiledata, isLoading: profileLoading, error:profileError } = useGetProfileQuery(token);

  const { data: usersData, isLoading: usersLoading,error: usersError } = useGetUsersQuery(token);


  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login");
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    
    
  }, []);

  return (
    <>
    <div>
      <h1>Profile section</h1>
      {token ? <p>Your JWT Token: {token}</p> : <p>Please log in <Link to="/login">here</Link></p>}
      <img src={profiledata?.image} alt="Profile" />
      {profileLoading && <p>Loading...</p>}
      {profileError && <p>Error: {(profileError as any).data.message}</p>}
      <button onClick={logout}>Logout</button>
    </div>
        <div>
        <h1>Users section</h1>
        {usersLoading && <p>Loading...</p>}
        {usersError && <p>Error: {(usersError as any).data.message}</p>}

        {/* {usersData?.users?.map((user: { id: number; username: string; email: string }) => (
         <table key={user.id} style={{ border: "1px solid black" }}>
          <thead>
          <th>Name</th>
          <th>Email</th>
          </thead>
          <tr>
            <td><p>{user.username}</p></td>
            <td>{user.email}</td>
          </tr>
         </table>
        ))} */}


        <table style={{ width: "50%", borderCollapse: "collapse", border: "1px solid black",textAlign:"center"}}>
          <thead>
            <tr style={{ border: "1px solid black" }}>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.users?.map((user: { id: number; username: string; email: string; firstName: string; lastName: string}) => (
              <tr style={{ border: "1px solid black" }} key={user.id}>
                <td style={{ border: "1px solid black" }}>{user.username}</td>
                <td style={{ border: "1px solid black" }}>{user.email}</td>
                <td style={{ border: "1px solid black" }}>{user.firstName} {user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
  );
};

export default Profile;
