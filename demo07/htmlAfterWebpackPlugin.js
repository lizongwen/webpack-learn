const pluginName = 'HtmlAfterWebpackPlugin';

class HtmlAfterWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
	  compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName,htmlPluginData=>{
		  const result=htmlPluginData.assets.js;
		  let _html=htmlPluginData.html;
		  console.log("结果:",result)
		  _html=_html.replace("<!--inject.js-->",`<script src="/${result}"></script>`);
		  htmlPluginData.html=_html;
	  })
    });
  }
}
module.exports=HtmlAfterWebpackPlugin