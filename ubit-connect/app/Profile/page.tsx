"use client";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from '@/Context/UserContext'

const page = () => {
  const [bio, setbio] = useState("");
  const [fullname, setfullname] = useState("");
  const [pfp, setpfp] = useState<File | null>(null);
  const [seatNo, setseatNo] = useState("");
  const [depart, setdepart] = useState("");
  const [batch, setbatch] = useState("");
  const [id,setid] = useState("")
  const [profile,setprofile] = useState(false)
  const user = useUserContext()

  const onsubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("sending")
    const formData = new FormData();
    formData.append("id",id)
    formData.append("fullname", fullname);
    formData.append("bio", bio);
    formData.append("seatno", seatNo);
    formData.append("depart", depart);
    formData.append("batch", batch);
    if(pfp){
         formData.append("pfp", pfp);
    }
   

    try {
      const { data } = await axios.post("api/Profile", formData);
      if (data.success) {
        console.log(data.message);
      }
      else{
        console.log("error")
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
    {user?
    <button onClick={()=>{
        setprofile(true)
        setid(user.id)
    }}>Set profile</button>  : null}
    {profile?
      <form onSubmit={onsubmitHandler}>
        <label>
          Name
          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={(event) => setfullname(event.target.value)}
            required
            placeholder="xyz"
          />
        </label>
        <label>
          Bio
          <input
            type="text"
            name="bio"
            value={bio}
            onChange={(event) => setbio(event.target.value)}
            required
            placeholder="xyz"
          />
        </label>
        <label>
          seat no
          <input
            type="text"
            name="seatno"
            value={seatNo}
            onChange={(event) => setseatNo(event.target.value)}
            required
            placeholder="xyz"
          />
        </label>
        <label>
          depart
          <input
            type="text"
            name="depart"
            value={depart}
            onChange={(event) => setdepart(event.target.value)}
            required
            placeholder="xyz"
          />
        </label>
        <label>
          batch
          <input
            type="text"
            name="batch"
            value={batch}
            onChange={(event) => setbatch(event.target.value)}
            required
            placeholder="xyz"
          />
        </label>
        <label>
          pfp
          <input
            type="file"
            name="pfp"
            onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                setpfp(e.target.files[0]);
              }
              else{
                setpfp(null)
              }
            }
            }
          />
        </label>

        <button type="submit">Submit</button>
      </form>
:null}
    </div>
  );
};

export default page;
