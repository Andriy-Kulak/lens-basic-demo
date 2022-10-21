import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client, recommendedProfiles } from "../api";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendedProfiles).toPromise();
      console.log({ response });
      setProfiles(response.data.recommendedProfiles);
    } catch (e) {
      console.log("err =>", { err });
    }
  }

  return (
    <div>
      {profiles.map((x) => (
        <div key={x.id} style={borderStyle}>
          <Link href={`profile/${x.id}`}>
            <a>
              <div>
                <div style={flexStyle}>
                  <div style={handleStyle}>
                    <h2>{x.name}</h2>
                    <h4>{x.handle}</h4>
                  </div>
                  {x.picture?.original?.url &&
                  x.picture?.original?.url.includes("lens.infura-ipfs.io") ? (
                    <div>
                      <Image
                        src={x.picture?.original?.url}
                        width={60}
                        height={60}
                        alt="profile pic"
                      />
                    </div>
                  ) : (
                    <div style={bgStyle}></div>
                  )}
                </div>
                <p>{x.bio}</p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

const borderStyle = { border: "1px solid black", padding: "5px 30px" };
const flexStyle = { display: "flex" };
const handleStyle = { margin: "0px 10px 0px 0px" };
const bgStyle = { width: "60px", height: "60px", backgroundColor: "#D3D3D3" };
