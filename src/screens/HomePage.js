import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    padding: 50,
    backgroundColor: 'skyblue',
    height: '100vh',
  },
  title: {
    fontSize: 72,
    fontWeight: '800',
    marginTop: 50
  },
  link: {
    fontSize: 24
  }
}

const HomePage = () =>  
  <div style={styles.container}>
    <Link to="/to-do" style={styles.link}>Go to TO-DO</Link>
    <div style={styles.title}>Welcome!</div>
  </div>

export default HomePage