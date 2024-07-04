import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.heroContainer}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.title}>Discover Your Next GREAT READ.</h1>
          <p style={styles.description}>
            Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
          </p>
          <div style={styles.buttonContainer}>
            <Link to="/all-books"
              style={{
                ...styles.discoverButton,
                ...(isHovered ? styles.discoverButtonHover : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Discover Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  heroContainer: {
    height: '100vh',
    width: '100%',
    background: 'url("./background.jpg") no-repeat center center/cover',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add overlay color
  },
  content: {
    zIndex: 1,
    textAlign: 'center',
    color: '#f5f5f5',
  },
  title: {
    fontSize: '4rem', // Adjust as needed
    fontWeight: 600,
    color: '#FACC15',
  },
  description: {
    marginTop: '1rem',
    fontSize: '1.5rem', // Adjust as needed
    color: '#D1D5DB',
  },
  buttonContainer: {
    marginTop: '2rem',
  },
  discoverButton: {
    color: '#FACC15',
    fontSize: '1.5rem', // Adjust as needed
    fontWeight: 600,
    border: '2px solid #FACC15',
    padding: '0.5rem 2rem',
    borderRadius: '9999px', // Full rounded corners
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease',
  },
  discoverButtonHover: {
    backgroundColor: '#1F2937', // Dark gray on hover
  },
};

export default Hero;
