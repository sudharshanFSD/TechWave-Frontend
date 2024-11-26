import React, { useEffect, useState } from 'react';
import { Carousel, Typography, Spin, message } from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const NewsCarousel = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const shuffleArray = (array) => {
        // Function to shuffle the news items
        return array.sort(() => Math.random() - 0.5);
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

    const shuffledNews = shuffleArray([...news]); // Shuffle the news array

    return (
        <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
              
            </Title>

            <Carousel autoplay dots={false}> {/* Dots are disabled here */}
                {shuffledNews.map((item, index) => (
                    <div key={item._id}>
                        {/* Displaying the content without the Card */}
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '20px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                backgroundImage: `url(${item.image[0]})`, // Use the image as the background
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '300px', // Set height for the carousel slide
                                color: 'white',
                                position: 'relative',
                            }}
                        >
                            {/* Removed the background from this container */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '20px',
                                    right: '20px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                }}
                            >
                                <Title level={4} style={{ color: 'white' }}>
                                    {item.title}
                                </Title>
                                <Paragraph
                                    ellipsis={{ rows: 3, expandable: false }}
                                    style={{ fontSize: '1rem', color: 'white' }}
                                >
                                    {item.description}
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default NewsCarousel;
