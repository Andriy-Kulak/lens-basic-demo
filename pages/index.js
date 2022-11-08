import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Heading } from '@chakra-ui/react'
import { client, recommendedProfiles } from '../api'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendedProfiles).toPromise()
      console.log({ response })
      setProfiles(response.data.recommendedProfiles)
    } catch (e) {
      console.log('err =>', { err })
    }
  }

  return (
    <div>
      {profiles.map((x) => (
        <Box
          key={x.id}
          maxW="lg"
          borderWidth="1px"
          margin="10px 30px"
          borderRadius="lg"
        >
          <Link href={`profile/${x.id}`}>
            <a>
              <div>
                <div style={flexStyle}>
                  <div style={handleStyle}>
                    <Heading size="md">{x.name}</Heading>
                    <Heading size="sm">{x.handle}</Heading>
                  </div>
                  {x.picture?.original?.url &&
                  x.picture?.original?.url.includes('lens.infura-ipfs.io') ? (
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
        </Box>
      ))}
    </div>
  )
}

const flexStyle = { display: 'flex' }
const handleStyle = { margin: '0px 10px 0px 0px' }
const bgStyle = { width: '60px', height: '60px', backgroundColor: '#D3D3D3' }
