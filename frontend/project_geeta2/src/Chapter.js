function Chapter({ bookName, chapterName, selectedChapter, selectedBook }) {

    return (<>
        {selectedBook ?
            (<div>
                {bookName}
            </div>):(<div>{chapterName}</div>)
        }
        {/* {console.log(selectedChapter)} */}
    </>
    );
}

export default Chapter;