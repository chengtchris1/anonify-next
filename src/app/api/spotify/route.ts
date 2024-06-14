import { NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";
let bearerToken = "";
let tokenFetchTime = new Date();
export async function GET(req: Request, res: Response) {
  const currentTime = new Date();
  if (
    bearerToken !== "" &&
    currentTime.getTime() - tokenFetchTime.getTime() < 60 * 60 * 1000
  ) {
    return NextResponse.json({
      token: bearerToken,
    });
  }

  let authData = qs.stringify({
    grant_type: "client_credentials",
    client_id: process.env.spotify_client_id,
    client_secret: process.env.spotify_secret,
  });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      authData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    bearerToken = response.data.access_token;
    tokenFetchTime = new Date();

    return NextResponse.json({
      token: response.data.access_token,
    });

    // return res.status(200).send(response.data.access_token);
  } catch (error) {
    return NextResponse.error();
  }
}
