import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewsDetailUser.css";

const NewsDetailUser = () => {
  document.title = "Chi tiết tin tức";
  const { id } = useParams(); // Lấy id từ URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosJWT = axios.create({
    baseURL: "https://befindrentalrooms-production.up.railway.app",
  });

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axiosJWT.get(`/v1/news/${id}`);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải chi tiết tin tức.");
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  if (error) return <p>{error}</p>;

  const formattedDate = new Date(news.createdAt).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="news-detail-page">
      <div className="news-detail-content">
        <div className="news-content">
          <h2 className="news-title">{news.title}</h2>
          <div className="news-meta">
            <span className="news-author">{news.author}</span>
            <span className="news-date">, {formattedDate}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailUser;
