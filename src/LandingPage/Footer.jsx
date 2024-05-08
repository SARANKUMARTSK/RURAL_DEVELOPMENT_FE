import React from 'react'

function Footer() {
  return <>
     <h1 style={{textAlign:"center" , margin:"20px"}}>Quick Links  </h1>

          <div className="footer-link-content">
            <div>
              <ul>
                <li>Citizen’s Charter</li>
                <li>Other Related Links</li>
                <li>Public Notices</li>
                <li>Grievances</li>
                <li>Right to Information</li>
                <li>Glossary</li>
                <li>Tenders</li>
              </ul>
            </div>
            <div>
               <ul>
                  <li>Financial</li>
                  <li>Developmental</li>
                  <li>Supervisory</li>
                  <li>Interest Rates</li>
                  <li>GOVT. Sponsored Scheme</li>
                  <li>Financial Reports</li>
                  <li>Publications</li>
                </ul>
            </div>
            <div>
              <ul>
                  <li>Acts & Regulations</li>
                  <li>Case Studies</li>
                  <li>Warehouse Directory</li>
                  <li>Investor Relations</li>
                  <li>Related Links</li>
                  <li>Contact Us</li>
                  <li>Clarifications</li>
                </ul>
            </div>

            <div>
              <ul>
                  <li>Fraud Complaints</li>
                  <li>Other Related Links</li>
                  <li>Gender Policy </li>
                  <li>Internal Committee</li>
                </ul>
            </div>

          </div>


           <footer style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px' }}>
                <p>&copy; 2024 Rural Development</p>
            </footer>
  </>
}

export default Footer