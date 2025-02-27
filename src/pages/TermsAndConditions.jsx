import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>**Terms & Conditions**</h1>
        <h3 style={styles.subHeading}>**Effective Date:** [15-Feb-2025]</h3>
        <h3 style={styles.subHeading}>**Last Updated:** [15-Feb-2025]</h3>

        <h2 style={styles.sectionTitle}> 1. Introduction & Acceptance</h2>
        <p style={styles.text}>
          Welcome to SwasthyaPro. By accessing and using our platform, you agree to abide by these Terms & Conditions. SwasthyaPro acts as an intermediary that facilitates the booking of laboratory tests with **NABL/NABH-certified labs**. We do not provide medical advice, diagnosis, or treatment.
        </p>

        <h2 style={styles.sectionTitle}> 2. User Responsibilities</h2>
        <p style={styles.text}>
          - Users must provide accurate personal details, including **name, contact number, home address, date of birth and email**.
          - Users must not share their account credentials with anyone and are responsible for securing their accounts.
          - Any misuse, fraudulent activity, or violation of these terms may result in **account suspension or termination**.
          - Users agree not to use the platform for any unlawful activity or attempt to gain unauthorized access to any part of the system.
        </p>

        <h2 style={styles.sectionTitle}> 3. Booking & Payments</h2>
        <p style={styles.text}>
          - Users can book tests through our platform with verified **NABL/NABH labs**.
          - Payments are processed securely via **Razorpay**, and SwasthyaPro does not store any payment details.
          - In case of fraudulent transactions, users must report within **24 hours** for resolution.
        </p>

        <h2 style={styles.sectionTitle}> 4. Prescription Upload & Consent</h2>
        <p style={styles.text}>
          - Users may be required to upload a **doctor’s prescription** for certain tests.
          - **Consent for Access:** The prescription remains **encrypted by default**. The support team can only access it with **explicit user approval via OTP or call confirmation**.
          - **Data Retention:** Uploaded prescriptions remain securely encrypted and accessible only to the user. Users can delete them at any time. If support staff need access, they must request permission via **OTP validation**.
        </p>

        <h2 style={styles.sectionTitle}> 5. Report Delivery & Security</h2>
        <p style={styles.text}>
          - Reports are delivered securely **via email and WhatsApp**.
          - Reports are **password-protected PDFs** (last 4 digits of the user’s phone number).
          - The **download link remains active for 7 days**, extendable up to **30 days upon request**.
          - After the expiry period, reports are **permanently deleted** from our servers.
          - Users are responsible for securely storing and sharing their reports. SwasthyaPro is **not responsible** for any data shared by users externally.
        </p>

        <h2 style={styles.sectionTitle}> 6. Data Protection & Compliance</h2>
        <p style={styles.text}>
          - SwasthyaPro follows the **Digital Personal Data Protection (DPDP) Act 2023**, **ISO 27001 security standards**, and applicable provisions under the **IT Act, 2000**.
          - All user data is **encrypted in transit and at rest** to prevent unauthorized access.
          - Users have the right to **permanently delete their data upon request**.
          - We do **not sell, share, or use user data for marketing purposes**.
          - Access to user data is strictly controlled, and every decryption request is logged for **security and audit purposes**.
        </p>

        <h2 style={styles.sectionTitle}> 7. Third-Party Disclosures</h2>
        <p style={styles.text}>
          - User reports are **only shared with partnered NABL/NABH-certified laboratories** for processing.
          - No data is shared with **advertisers, marketers, or any unauthorized third parties**.
          - Users acknowledge and consent that reports **must be shared with partnered laboratories** to complete the testing process.
        </p>

        <h2 style={styles.sectionTitle}> 8. Account Deletion & Data Retention</h2>
        <p style={styles.text}>
          - Users can request **account deletion** at any time.
          - All user data is automatically **removed from our system** once reports expire.
          - User accounts that remain **inactive for more than 12 months** may be subject to **automatic deletion** for security purposes.
        </p>

        <h2 style={styles.sectionTitle}> 9. Limitation of Liability</h2>
        <p style={styles.text}>
          - SwasthyaPro is **not responsible for the accuracy of test results**, as they are provided by independent NABL/NABH-certified labs.
          - The platform is **not liable** for any loss or damage arising from user actions, including sharing reports with unauthorized parties.
          - Users are advised to **consult qualified medical professionals** before making health-related decisions based on test reports.
          - In no event shall SwasthyaPro be liable for any **indirect, incidental, special, or consequential damages** arising from the use of the platform.
        </p>

        <h2 style={styles.sectionTitle}> 10. Governing Law & International Use</h2>
        <p style={styles.text}>
          - These Terms & Conditions are governed by the **laws of India**.
          - Users outside India acknowledge that SwasthyaPro **complies with Indian regulations** and cannot be held liable for non-compliance with **foreign laws**.
          - Any disputes arising from the use of the platform shall be subject to the **exclusive jurisdiction of the courts in [City/State]**.
          - By using SwasthyaPro, User acknowledge and accept our policies, including any future updates or modifications. Your continued use of the platform after any changes constitutes acceptance of the revised policies.
        </p>

        <h2 style={styles.sectionTitle}> 11. Electronic Consent & Communication</h2>
        <p style={styles.text}>
          - Users agree that all electronic records, including **OTP approvals, emails, and digital signatures**, are legally binding and hold the same weight as physical documents.
        </p>

        <h2 style={styles.sectionTitle}> 12. Force Majeure Clause</h2>
        <p style={styles.text}>
          - SwasthyaPro is **not liable** for service disruptions due to **natural disasters, cyberattacks, legal changes, or unforeseen events beyond our control**.
        </p>

        <h2 style={styles.sectionTitle}> 13. Regulatory Compliance Disclaimer</h2>
        <p style={styles.text}>
          - SwasthyaPro operates in compliance with **Indian data protection laws**. Users outside India acknowledge that **local laws may differ**, and SwasthyaPro **cannot be held liable** for non-compliance with regulations of other countries.
        </p>

        <h2 style={styles.sectionTitle}> 14. Fraud Prevention & Misuse</h2>
        <p style={styles.text}>
          - If fraudulent activity is detected, SwasthyaPro **may suspend or terminate accounts** and report violations to relevant **authorities**.
        </p>

        <h2 style={styles.sectionTitle}> 15. Amendments & Policy Updates</h2>
        <p style={styles.text}>
          - SwasthyaPro reserves the right to **modify these Terms & Conditions** at any time.
          - Users will be notified of significant updates, and continued usage of the platform implies **acceptance of the revised terms**.
        </p>

        <h2 style={styles.sectionTitle}> 16. Contact & Support</h2>
        <p style={styles.text}>
          For any questions or support, please contact us:  
          📧 **Email:** support@swasthyapro.com 
          📞 **Phone:** [07827509029]  
          🌐 **Website:** swasthyapro.com
        </p>

        <p style={styles.text}>
          _By using our platform, you acknowledge and accept these Terms & Conditions._
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
};

export default TermsAndConditions;