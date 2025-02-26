import React from "react";

export default function About() {
  return (
    <div style={styles.container}>
      <h2>About Us</h2>
      <p>Welcome to our Random Dog Image Generator! This app fetches cute dog pictures using the Dog CEO API.</p>
      <p>We love dogs and wanted to create a fun way for users to explore different breeds.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
};
