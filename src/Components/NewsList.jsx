import React, { useEffect, useState } from 'react';
import { Card, Spin, Typography, message } from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startX, setStartX] = useState(null); // For swipe detection

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/apiNews/getNews');
        setNews(response.data.data || []); // Adjust based on your API response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        message.error('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    setStartX(touchStartX); // Store the starting position of the touch
  };

  const handleTouchMove = (e) => {
    if (startX === null) return; // Ignore touch moves if the swipe hasn't started
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 50) {
      // Swiped left (more than 50px distance)
      console.log('Swiped Left');
      setStartX(null); // Reset swipe tracking
    } else if (diff < -50) {
      // Swiped right (more than 50px distance)
      console.log('Swiped Right');
      setStartX(null); // Reset swipe tracking
    }
  };

  const handleTouchEnd = () => {
    setStartX(null); // Reset swipe tracking when touch ends
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Title level={3}>No news available</Title>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Title level={2} style={{ marginBottom: '20px' }}>
        Latest News
      </Title>

      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          gap: '16px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {news.map((item, index) => (
          <Card
            key={item._id}
            hoverable
            style={{
              minWidth: '300px',
              maxWidth:'300px',
              flexShrink: 0,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column', // Ensure that title, image, and description stack vertically
            }}
            cover={
              <img
                alt={item.title}
                src={item.image[0]} // Use the first image from the array
                style={{
                  height: '200px', // Fixed height for the image
                  width: '100%', // Ensure the image fills the card width
                  objectFit: 'cover', // Ensure the image fills the area without distortion
                }}
              />
            }
          >
            <Title level={4} style={{ fontSize: '1.2rem' }}>
              {item.title}
            </Title>
            <Paragraph
              ellipsis={{
                rows: 3,
                expandable: false,
              }}
              style={{ fontSize: '1rem' }}
            >
              {item.description}
            </Paragraph>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#1890ff',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Read more
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
