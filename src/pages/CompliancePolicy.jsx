import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const CompliancePolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Compliance Policy</h1>
        <h3 style={styles.subHeading}>Effective Date: [Insert Date]</h3>
        <h3 style={styles.subHeading}>Last Updated: [Insert Date]</h3>

        <h2 style={styles.sectionTitle}>1. Introduction</h2>
        <p style={styles.text}>
          SwasthyaPro is committed to full compliance with all applicable laws, regulations, and industry standards governing online healthcare services, data privacy, security, and financial transactions. This Compliance Policy outlines our adherence to legal frameworks, security measures, and regulatory obligations to ensure transparency, accountability, and legal integrity.
        </p>
        <p style={styles.text}>
          By using SwasthyaPro, users acknowledge and agree to the compliance measures outlined herein.
        </p>

        <h2 style={styles.sectionTitle}>2. Legal & Regulatory Compliance</h2>
        <h3 style={styles.subSectionTitle}>A. Data Protection & Privacy Laws</h3>
        <p style={styles.text}>
          SwasthyaPro strictly complies with the following data protection laws:
        </p>
        <ul style={styles.list}>
          <li>Digital Personal Data Protection (DPDP) Act, 2023</li>
          <li>Information Technology Act, 2000 (including IT Rules, 2011)</li>
          <li>ISO 27001: Information Security Management Standards</li>
        </ul>
        <p style={styles.text}>
          Key Data Protection Measures:
        </p>
        <ul style={styles.list}>
          <li>End-to-End Encryption: User data, including medical prescriptions and reports, is encrypted.</li>
          <li>Minimal Data Retention: User reports auto-delete after 7 days; prescriptions after 1 day.</li>
          <li>User Consent Management: Explicit opt-in required for data access and decryption.</li>
          <li>Right to Erasure: Users may request permanent data deletion.</li>
        </ul>

        <h3 style={styles.subSectionTitle}>B. Consumer Protection & E-Commerce Compliance</h3>
        <p style={styles.text}>
          SwasthyaPro operates in accordance with the Consumer Protection Act, 2019, ensuring:
        </p>
        <ul style={styles.list}>
          <li>Transparent pricing and refund policies (aligned with our Payment & Refund Policies).</li>
          <li>Fair business practices prohibiting misleading advertisements.</li>
          <li>Grievance redressal mechanisms for customer complaints.</li>
        </ul>

        <h3 style={styles.subSectionTitle}>C. Healthcare & Lab Compliance</h3>
        <p style={styles.text}>
          All partnered diagnostic laboratories are NABL (National Accreditation Board for Testing and Calibration Laboratories) and NABH (National Accreditation Board for Hospitals & Healthcare Providers) certified.
        </p>
        <p style={styles.text}>
          Reports generated through our partnered labs comply with Indian Medical Council (Professional Conduct, Etiquette & Ethics) Regulations, 2002.
        </p>
        <p style={styles.text}>
          We strictly follow telemedicine and online healthcare service regulations (where applicable).
        </p>

        <h3 style={styles.subSectionTitle}>D. Financial & Payment Compliance</h3>
        <p style={styles.text}>
          SwasthyaPro ensures payment security and regulatory adherence through:
        </p>
        <ul style={styles.list}>
          <li>PCI-DSS Compliance: All payment transactions processed via Razorpay, which is PCI-DSS Level 1 compliant.</li>
          <li>RBI Guidelines Adherence: Transactions comply with the Reserve Bank of India’s digital payment regulations.</li>
          <li>Fraud Prevention Mechanisms: Secure OTP authentication, transaction monitoring, and dispute resolution mechanisms.</li>
        </ul>
        <p style={styles.text}>
          SwasthyaPro is not liable for payment gateway failures, chargeback frauds, or delays caused by third-party financial institutions.
        </p>

        <h2 style={styles.sectionTitle}>3. Intellectual Property & Platform Compliance</h2>
        <h3 style={styles.subSectionTitle}>A. Intellectual Property Protection</h3>
        <p style={styles.text}>
          The SwasthyaPro brand, logo, website design, content, and software are protected under Indian Copyright Act, 1957 and Trademark Act, 1999.
        </p>
        <p style={styles.text}>
          Unauthorized reproduction, distribution, or modification of SwasthyaPro’s intellectual property is strictly prohibited.
        </p>

        <h3 style={styles.subSectionTitle}>B. Prohibited Activities & Legal Enforcement</h3>
        <p style={styles.text}>
          The following actions are strictly prohibited and will result in legal consequences, including civil or criminal liability:
        </p>
        <ul style={styles.list}>
          <li>Data Scraping & Unlawful Access: Any attempt to extract, mine, or misuse platform data.</li>
          <li>Impersonation & Fraudulent Transactions: False identity usage or unauthorized bookings.</li>
          <li>Unauthorized Commercial Use: Reselling or redistributing SwasthyaPro services without prior authorization.</li>
        </ul>
        <p style={styles.text}>
          SwasthyaPro reserves the right to take legal action, including prosecution, civil damages, and reporting to regulatory authorities in case of non-compliance.
        </p>

        <h2 style={styles.sectionTitle}>4. Security & Cyber Compliance</h2>
        <h3 style={styles.subSectionTitle}>A. Information Security Standards</h3>
        <p style={styles.text}>
          SwasthyaPro follows ISO 27001 security protocols, ensuring compliance with best practices for data protection.
        </p>
        <p style={styles.text}>
          SSL Encryption is implemented for all platform transactions and communications.
        </p>
        <p style={styles.text}>
          Access Controls & Logging: System activity is monitored, and unauthorized access attempts are recorded.
        </p>

        <h3 style={styles.subSectionTitle}>B. Data Breach & Cybersecurity Incident Handling</h3>
        <p style={styles.text}>
          In case of a cybersecurity breach, SwasthyaPro will follow the mandated reporting guidelines under CERT-In (Indian Computer Emergency Response Team) regulations.
        </p>
        <p style={styles.text}>
          Affected users will be notified within the legally required timeframe, and corrective measures will be implemented.
        </p>
        <p style={styles.text}>
          SwasthyaPro cannot be held liable for breaches caused by third-party service providers, including but not limited to payment gateways, cloud storage providers, or external laboratories.
        </p>

        <h2 style={styles.sectionTitle}>5. Dispute Resolution & Governing Law</h2>
        <h3 style={styles.subSectionTitle}>A. Arbitration & Legal Jurisdiction</h3>
        <p style={styles.text}>
          Any disputes arising out of compliance with this policy shall first be resolved through mediation or arbitration under the Arbitration and Conciliation Act, 1996.
        </p>
        <p style={styles.text}>
          If arbitration fails, legal proceedings shall be subject to the exclusive jurisdiction of the courts in [City, State], India.
        </p>

        <h3 style={styles.subSectionTitle}>B. Force Majeure</h3>
        <p style={styles.text}>
          SwasthyaPro shall not be liable for non-compliance or service disruptions arising due to:
        </p>
        <ul style={styles.list}>
          <li>Natural disasters, pandemics, or government restrictions.</li>
          <li>Technical failures beyond SwasthyaPro’s control (e.g., cloud server outages, third-party breaches).</li>
        </ul>

        <h2 style={styles.sectionTitle}>6. Compliance Updates & Amendments</h2>
        <p style={styles.text}>
          SwasthyaPro reserves the right to update this Compliance Policy periodically to align with evolving legal frameworks.
        </p>
        <p style={styles.text}>
          Users will be notified of significant policy changes, and continued use of the platform after such updates shall constitute acceptance of the revised terms.
        </p>

        <h2 style={styles.sectionTitle}>7. Compliance Contact Information</h2>
        <p style={styles.text}>
          For compliance-related inquiries, legal concerns, or reporting regulatory violations, users may contact:
        </p>
        <ul style={styles.list}>
          <li>📧 Email: compliance@swasthyapro.com</li>
          <li>📞 Phone: [Compliance Department Contact]</li>
        </ul>

        <p style={styles.text}>
          By accessing and using SwasthyaPro, you acknowledge and agree to this Compliance Policy and all applicable legal terms herein.
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
  subSectionTitle: { fontSize: '18px', fontWeight: 'bold', marginTop: '10px' },
  text: { fontSize: '16px', textAlign: 'justify', marginTop: '5px' },
  list: { fontSize: '16px', textAlign: 'justify', marginTop: '5px', listStyleType: 'disc', paddingLeft: '20px' },
};

export default CompliancePolicy;