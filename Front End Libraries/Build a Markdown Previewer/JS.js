marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized ? 
          ['editorWrap maximized', 
           'previewWrap hide', 
           'fa fa-compress'] : 
          this.state.previewMaximized ?
          ['editorWrap hide', 
           'previewWrap maximized', 
           'fa fa-compress'] :
          ['editorWrap', 
           'previewWrap', ];
    return (
      <div>
        <div className={classes[0]}>
          <Toolbar 
            icon={classes[2]} 
            onClick={this.handleEditorMaximize}
            text="Editor"/>
          <Editor markdown={this.state.markdown} 
            onChange={this.handleChange} />
        </div>
        <div className="converter">
        </div>
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]} 
            onClick={this.handlePreviewMaximize}
            text="Previewer"/>
          <Preview  markdown={this.state.markdown}/>
        </div>
      </div>
    )
  }
};

const Toolbar = (props) => {
    return (
      <div className="toolbar">
        <i title="no-stack-dub-sack" className=""/>      
        {props.text}
        <i onClick={props.onClick} className={props.icon}></i>
      </div>
   )
}

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"/>
    )
}

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
    )
}

const placeholder = 
`# fghj

## fghj
### fghj
  
dfg, \`<div></div>\`

\`\`\`
// dghj:

function f(ff, ll) {
  if (ll == '\`\`\`' && ll == '\`\`\`') {
    return ml;
  }
}
\`\`\`
  
 **bold**... whoa!

[links](https://www.freecodecamp.com)
> fghj


1. kjsk.


![React Logo w/ Text](https://goo.gl/Umyytc)
`

ReactDOM.render(<App />, document.getElementById('app'));

