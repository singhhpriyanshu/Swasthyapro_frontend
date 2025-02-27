import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const IntellectualPropertyPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Intellectual Property (IP) Policy</h1>
        <h3 style={styles.subHeading}>Effective Date: [Insert Date]</h3>
        <h3 style={styles.subHeading}>Last Updated: [Insert Date]</h3>

        <h2 style={styles.sectionTitle}>1. Ownership of Intellectual Property</h2>
        <p style={styles.text}>
          All content, trademarks, logos, text, graphics, software, and other materials available on the SwasthyaPro platform (collectively, the "Content") are the exclusive property of SwasthyaPro or its licensors.
        </p>
        <p style={styles.text}>
          Unauthorized use, reproduction, distribution, modification, or resale of any Content without prior written consent is strictly prohibited.
        </p>

        <h2 style={styles.sectionTitle}>2. User Restrictions</h2>
        <p style={styles.text}>
          Users agree not to:
        </p>
        <ul style={styles.list}>
          <li>Copy, reproduce, distribute, modify, or create derivative works from any Content on SwasthyaPro.</li>
          <li>Use any SwasthyaPro branding, logos, or intellectual property for commercial purposes without express authorization.</li>
          <li>Reverse-engineer, decompile, or attempt to extract source code from SwasthyaPro’s software.</li>
        </ul>

        <h2 style={styles.sectionTitle}>3. Copyright Infringement & DMCA Compliance</h2>
        <p style={styles.text}>
          If you believe that your copyrighted work has been used or displayed in a manner that constitutes infringement, please submit a written notice to our designated Copyright Agent at [support@swasthyapro.com], including:
        </p>
        <ul style={styles.list}>
          <li>A description of the copyrighted work and its location on SwasthyaPro.</li>
          <li>Your contact details (name, email, phone number).</li>
          <li>A statement that you have a good faith belief that the use is unauthorized.</li>
          <li>A statement that the information provided is accurate and that you are the copyright owner or authorized to act on behalf of the owner.</li>
        </ul>

        <h2 style={styles.sectionTitle}>4. Violation & Consequences</h2>
        <p style={styles.text}>
          Violations of this IP Policy may result in:
        </p>
        <ul style={styles.list}>
          <li>Account suspension or termination.</li>
          <li>Legal action for damages resulting from IP infringement.</li>
          <li>Permanent restriction from using SwasthyaPro’s services.</li>
        </ul>

        <p style={styles.text}>
          By using SwasthyaPro, you acknowledge and agree to this Intellectual Property (IP) Policy and all applicable legal terms herein.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#fff' },
  card: { padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '800px', margin: 'auto' },
  heading: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' },
  subHeading: { fontSize: '18px', textAlign: 'center', marginBottom: '10px' },
  sectionTitle: { fontSize: '20px', fontWeight: 'bold', marginTop: '15px' },
  text: { fontSize: '16px', textAlign: 'justify', marginTop: '5px' },
  list: { fontSize: '16px', textAlign: 'justify', marginTop: '5px', listStyleType: 'disc', paddingLeft: '20px' },
};

export default IntellectualPropertyPolicy;