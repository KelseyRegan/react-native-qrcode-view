var React = require('react-native');

var JSQR = require('javascript-qrcode');

var {
  AppRegistry,
  StyleSheet,
  View,
} = React;

// var RNQRCodeView = require('react-native-qrcode-view');

var QRCodeView = React.createClass(
{
  getDefaultProps : function()
  {
    return {
      data : "",
      positiveColor : 'black',
      negativeColor : 'white',
      dimension : 200,
    }
  },

  getInitialState : function()
  {
    return {
      qrRendered : [[]],
    }
  },

  componentDidMount : function()
  {
    if( this.props.data.length > 0 )
    {
      this.setData(this.props.data);
    }
  },

  _data : "",
  setData : function(newData)
  {
    if( newData == this._data ) return;

    this._data = newData;

    var qrcode = new JSQR.QrCode(this._data);
    var matrix = qrcode.getData();
    var posCol = this.props.positiveColor;
    var negCol = this.props.negativeColor;

    var blockDim = Math.floor(this.props.dimension/matrix.length);
    var qrRendered = <View style={[styles.container]}>
      {
        matrix.map(function(row, index)
        {
          return (
            <View key={index} style={[styles.row, {height:blockDim}]}>
              {
                row.map(function(value, column)
                {
                  return (<View key={index + "-" + column} style={[styles.block,{width:blockDim, height:blockDim, backgroundColor:value == '1' ? posCol : negCol}]} />)
                })
              }
            </View>
          )
        })
      }
    </View>;

    this.setState({qrRendered:qrRendered});
  },

  render: function()
  {
    return (
      <View ref='container' style={this.props.style}>
        {this.state.qrRendered}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  block: {
  },
  instructionContainer: {
    backgroundColor:'blue',
  },
  instructionText: {
    fontSize: 22,
    margin:10,
  },
  backgroundView: {
    position: 'absolute',
  },
});

module.exports = QRCodeView;
