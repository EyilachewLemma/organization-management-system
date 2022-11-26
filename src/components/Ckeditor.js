import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'


const Ckeditor = ({onBuler}) => {
    return (
        <div>
            <div className="App">
                <CKEditor
                    editor={Editor}
                    data="<p>click here to write report</p>"
                    onBlur={(event, editor) => {
                        onBuler(editor.getData())
                    }}
                />
            </div>
        </div>
    )
}

export default Ckeditor;
