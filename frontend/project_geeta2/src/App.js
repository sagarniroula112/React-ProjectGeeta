import { useState, useEffect } from 'react';
import './App.css';
import Book from './Book';
import Chapter from './Chapter';
import Verse from './Verse';
import Translation from './Translation';
import BackButton from './BackButton';

function App() {
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showBooks, setShowBooks] = useState(true);
  const [showChapters, setShowChapters] = useState(false);
  const [showVerses, setShowVerses] = useState(false);
  const [showTranslations, setShowTranslations] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7600").then((response) => response.json()).then((data) => {
      const uniqueBooks = [...new Set(data.map((book) => book.bookName))];
      setBooks(uniqueBooks);
    }).catch((err) => {
      console.error("Error fetching data!");
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:7600/geeta").then((response) => response.json()).then((data) => {
      const uniqueChapters = [...new Set(data.map((chapter) => chapter.chapterName))];
      setChapters(uniqueChapters);
    }).catch((err) => {
      console.error("Error fetching data!");
    });
  }, []);

  useEffect(() => {
    if (selectedChapter) {
      fetch(`http://localhost:7600/geeta/${selectedChapter.toLowerCase()}`) // Update the URL as needed
        .then((response) => response.json())
        .then((data) => {
          setVerses(data.map((item) => item.verse));
          setTranslations(data.map((item) => item.translation));
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [selectedChapter]);

  useEffect(() => {
    console.log("Selected Book:", selectedBook);
  }, [selectedBook]);

  useEffect(() => {
    console.log("Selected Chapter:", selectedChapter);
  }, [selectedChapter]);

  function handleBookClick(bookName) {
    setShowBooks(false);
    setShowChapters(true);
    setSelectedBook(bookName);
    setShowVerses(false);
    setShowTranslations(false);
    setSelectedChapter(null); // Clear 
    setVerses([]); // Clear 
    setTranslations([]); // Clear
  }

  function handleChapterClick(chapterName) {
    setShowBooks(false);
    setShowChapters(false);
    setShowVerses(true);
    setShowTranslations(true);
    setSelectedChapter(chapterName);
  }

  function handleBackClick() {
    if (showVerses) {
      setShowVerses(false);
      setShowTranslations(false);
      setShowChapters(true);
      setVerses([]); // Clear
      setTranslations([]); // Clear
    } else if (showChapters) {
      setShowChapters(false);
      setShowBooks(true);
      setSelectedBook(null); // Clear
    }
  }

  return (
    <div className="App">
      <div className="outermost-box">
        <div className="top-box">
          <h1>Welcome!</h1>
          <div className="login-register">
            <li>Log in</li>
            <button>Sign up</button>
          </div>
        </div>

        <div className="horizontal-bar"></div>
        <div className="main-box">
          <p>Choose to gain knowledge and insights ... </p>
          <div className="books-collection">
            {showBooks && books.map((bookName) => (
              <div onClick={() => handleBookClick(bookName)} className="book" key={bookName}>
                <Book bookName={bookName} />
              </div>
            ))}

            {showChapters && chapters.map((chapterName) => (
              <div onClick={() => handleChapterClick(chapterName)} className="book" key={chapterName}>
                <Chapter chapterName={chapterName} />
              </div>
            ))}

            {showVerses && showTranslations && verses.map((verse, index) => (
              <div style={{ display: 'flex', flexDirection: 'column', height: '50vh' }} className="book" key={verse}>
                <Verse verse={verse} />
                <Translation translation={translations[index]} />
              </div>
            ))}
          </div>
          
          {!showBooks && (
            <BackButton onClick={handleBackClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
