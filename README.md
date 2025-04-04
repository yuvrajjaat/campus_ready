# CampusReady

## Setup and Run Instructions

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (latest LTS version recommended)
- npm or yarn
- Python (for PDF parsing)

### Installation
```sh
# Clone the repository
git clone https://github.com/yuvrajjaat/campus_ready.git
cd campus_ready

# Install dependencies
cd frontend
npm install

cd backend
npm install
```
Create an uploads folder in the project backend folder to store uploaded PDFs:
```sh
cd backend
mkdir uploads
```
Update config.js with any necessary configurations such as file storage paths and Mongo URL.

### Running the Application
(backend)
```sh
# Start Server in backend
npm start
```

For production build:
(frontend)
```sh
npm run dev
```
## 📸 Screenshots

### 1. Login Page
![Screenshot 2025-04-04 185833](https://github.com/user-attachments/assets/6faf5c8c-d65a-48b5-b7ac-01596b6c6903)
### 2. Dashboard
![Screenshot 2025-04-04 185853](https://github.com/user-attachments/assets/b19fb46d-a380-404a-8943-70350ee3ee85)
### 3. Upload Page
![Screenshot 2025-04-04 185907](https://github.com/user-attachments/assets/bc68a240-31ce-486b-91f3-3d7c2400de7d)
### 4. PDF Preview
![Screenshot 2025-04-04 185947](https://github.com/user-attachments/assets/1d8a88f6-d791-4f31-936d-867635c8fc81)
### 5. XML Download
![Screenshot 2025-04-04 185958](https://github.com/user-attachments/assets/225d5507-30b2-4d78-b528-a7a7aea33d6d)


## Technology Choices and Reasoning

- **Node.js & Express.js**: Backend framework for handling API requests efficiently.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **React (or Vanilla JS if limited)**: Frontend framework for dynamic UI rendering.
- **PDF Parsing Library (pdf-parse/PyMuPDF)**: Extracting text and structure from PDFs.
- **XML Parser (xml2js)**: Converting structured data into XML format.

## Challenge Level Implemented
We have implemented till Level 2, focusing on:
- Parsing structured PDFs into XML format.
- Handling multiple document structures.
- Preserving metadata for accurate XML conversion.

## Approach to PDF-to-XML Conversion
1. **Extract Text and Metadata**: Used a PDF parsing library to extract text and metadata.
2. **Structure Detection**: Identified sections, tables, and headers using heuristic rules.
3. **XML Mapping**: Converted structured content into XML format using predefined schemas.
4. **Validation**: Ensured the XML output is valid and consistent with expected formatting.

## Assumptions and Limitations
### Assumptions:
- The PDF follows a structured format with identifiable sections.
- Text-based PDFs are used (scanned images require OCR integration).
- Standard XML schemas are used for transformation.

### Limitations:
- Might struggle with highly unstructured or complex layouts.
- OCR is not yet integrated for image-based PDFs.
- Handling of special characters and multi-column text may need optimization.

## Future Improvements
- **OCR Integration**: Use Tesseract.js or AWS Textract for image-based PDFs.
- **AI-based Parsing**: Implement NLP models to detect and extract structured data more intelligently.
- **Configurable XML Mapping**: Allow users to define custom XML schemas.
- **Performance Optimization**: Improve parsing speed for large PDFs.
- **Error Handling & Logging**: Better error detection for inconsistent formats.

---
Feel free to contribute or report any issues! 🚀
