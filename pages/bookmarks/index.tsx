import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Input } from '@components/Inputs';
import { ContentColumn, PostImage, StatusText } from '@components/ContentContainer';
import { apiGet } from '@components/Request';
import IconButton from '@components/IconButton';
import BookmarkCard from '@components/Bookmark';
import { Row } from '@components/Row';
import DataControl from '@components/DataControl';

const Bookmarks: NextPage = () => {
    type inputType = string;
    const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);
    const [prefix, setPrefix] = useState<string>("https://");
    const [setValue, setSetValue] = useState<string | null | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [bookmarksLoading, setBookmarksLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [newBookmark, setNewBookmark] = useState<Bookmark | undefined>();
    const [bookmarkFilters, setBookmarkFilters] = useState<DataParams | undefined>();
    const searchParams = ():string => {
        if (!bookmarkFilters) return '';
        let params = '?';
       
        return params;

    }   
    const { mutate, isValidating } = apiGet({
        uri: `/bookmarks${searchParams()}`,
        onSuccess: (data: any) => {
            console.log('got bookmarks')
            if (data.bookmarks) setBookmarks(data.bookmarks);
            setLoading(false)
        },
        onError: (error: any) => {
            setErrorMessage(error.message || error)
            setLoading(false);
        },
    });
    useEffect(() => {
        setBookmarksLoading(isValidating);
    }, [isValidating]);
    const handleSave = async () => {
        console.log(`save new bookmark`)
        newBookmark?.onSave && await newBookmark.onSave();
        setNewBookmark(undefined);
    }
    const handleSubmit = async (url: string, onComplete: Function) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/bookmarks`, { method: 'POST', body: JSON.stringify({ url }) }).then(res => res.json());
            if (response.error) {
                let message = response.error;
                if (response.errors) {
                    message = message + ': ' + response.errors.map((err: { msg: string, location: string, param: string }) => `${err.msg} for ${err.param}`)
                }
                throw (message);
            }
            if (response.bookmark) {
                setErrorMessage(undefined);
                setNewBookmark({
                    title: response.bookmark.title,
                    url: response.bookmark.url,
                    image: response.bookmark.image,
                    description: response.bookmark.description,
                    id: response.bookmark.id,
                    onSave: async () => {
                        /* await savebookmark */
                        mutate();
                        onComplete();
                    }
                });

            }
        } catch (e: any) {
            setErrorMessage(e.message || e);
        }
        setLoading(false)
    }
    const handleUpdate = async (url: string, onComplete: Function) => {

        console.log('handle update new one')
    }
    const handleChange = async (e: inputType, onComplete: Function) => {
        const regex = RegExp('^' + '(https://|http://)', 'ig');
        let url = e;
        let protocol = e.match(regex);

        if (protocol) {
            url = e.substring(protocol[0].length, e.length);
            setSetValue(url);
            setPrefix(`${protocol[0]}`)
        }
        url = (protocol ? protocol[0] : prefix) + url;
        /* if newbookmark exists, handleUpdate, otherwise handleSubmit */
        if (newBookmark) {
            handleUpdate(url, onComplete)
        } else {
            handleSubmit(url, onComplete);
        }

    }
    const filterUpdate = (data:DataParams) => {
        setBookmarkFilters(Object.assign({},bookmarkFilters,{...data}))
    }
    return (<>
        <h1>Bookmarks</h1>
        <ContentColumn>
            <Input
                returnOnChange={handleChange}
                placeholder="Enter a URL to save"
                name="url"
                prefix={prefix}
                loading={loading}
                setValue={setValue}
            />
         
            {
                errorMessage && <StatusText status='error'>
                    {errorMessage}
                </StatusText>
            }

            {/* show a preview */}
            {
                newBookmark && <>
                    {newBookmark.title} - {newBookmark.url}
                    <div style={{ width: 150 }}>
                        <PostImage
                            src={`https://cdn.johncajigas.com/${newBookmark.image}`}
                            preview={true}
                        />
                    </div>


                    <div>
                        <IconButton
                            icon='save'
                            status='success'
                            label='Save Bookmark'
                            onClick={handleSave}
                        />
                    </div>
                </>
            }

        </ContentColumn>


        {/* filters,nav search form  */}

        <DataControl
            type="bookmark"
            total={bookmarks.length}
            searching={bookmarksLoading}
            onSearch={(searchTerm:string)=>filterUpdate({search:searchTerm})}
        
        />
        {/* bookmark lists */}
        {
            bookmarksLoading && <>loading bookmarks</>
        }
    <Row style={{flexWrap:'wrap'}} justify="center" mobileBreak>
    {
            bookmarks.map(bookmark => {
                return (<BookmarkCard key={bookmark.url} {...bookmark} />)
            })
        }
 
    </Row>
   
        

    </>)
}

export default Bookmarks;