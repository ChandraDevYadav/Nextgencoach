import axios from 'axios';

const createZoomMeeting = async (meetingDetails) => {
  try {
    const authResponse = await axios.post(
      'https://zoom.us/oauth/token',
      new URLSearchParams({
        grant_type: 'account_credentials',
        account_id: process.env.ZOOM_ACCOUNT_ID
      }),
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = authResponse.data.access_token;

    const meetingResponse = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: meetingDetails.topic,
        type: 2,
        start_time: meetingDetails.start_time,
        duration: meetingDetails.duration,
        timezone: meetingDetails.timezone,
        settings: {
          join_before_host: true,
          participant_video: true,
          mute_upon_entry: false,
          waiting_room: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      id: meetingResponse.data.id,
      join_url: meetingResponse.data.join_url,
      start_url: meetingResponse.data.start_url
    };
  } catch (error) {
    console.error('Error creating Zoom meeting:', error.response?.data || error.message);
    throw error;
  }
};

export {
  createZoomMeeting
};