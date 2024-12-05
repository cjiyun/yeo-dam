import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const banners = [
    '/images/N-Seoul-tower.jpeg',
    '배너2 이미지 URL',
    '배너3 이미지 URL',
    '배너4 이미지 URL',
    '배너5 이미지 URL',
  ];
  
  // const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  // const [banners, setBanners] = useState([]);

  // useEffect(() => {
  //   const fetchTopDestinations = async () => {
  //     try {
  //       const response = await axios.get('/api/top-destinations'); // 가정: API에서 평점이 높은 여행지를 가져옴
  //       setBanners(response.data);
  //     } catch (error) {
  //       console.error('Error fetching top destinations:', error);
  //     }
  //   };

  //   fetchTopDestinations();
  // }, []);

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.profile')) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isProfileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <div className="app">
      {/* Header and Navigation */}
      <header className="header">
        <div className="logo" onClick={() => window.location.reload()}>여담</div>
        <nav className="nav">
          <ul>
            <li>검색</li>
            <li>가보고 싶은 장소</li>
            <li>여행 기록</li>
            <li>문의하기</li>
          </ul>
        </nav>
        <div className="profile">
          <img
            src="/images/default_profile.jpg"
            alt="프로필"
            onClick={handleProfileClick}
          />
          {isProfileMenuOpen && (
            <div className="profile-submenu">
              <ul>
                <li className="submenu-item">설정</li>
                <li className="submenu-item">로그아웃</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Banner Section */}
      <div className="banner-section">
        <button className="arrow left-arrow" onClick={handlePrevBanner}>
          ◀
        </button>
        <div className="banner">
          {banners.length > 0 ? (
            <img src={banners[currentBannerIndex].imageUrl} alt={`배너 ${currentBannerIndex + 1}`} />
          ) : (
            <p>Loading banners...</p>
          )}
        </div>
        <button className="arrow right-arrow" onClick={handleNextBanner}>
          ▶
        </button>
      </div>

      {/* 여행지 추천 Section */}
      {selectedKeywords.map((keyword) => (
        <section className="recommend-section" key={keyword}>
          <h2>#{keyword}</h2>
          <div className="recommend-list">
            {recommendations[keyword]?.map((destination) => (
              <div className="recommend-item" key={destination.dest_id}>
                <img src={destination.image} alt={destination.dest_name} />
                <p>{destination.dest_name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default App;