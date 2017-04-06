import React from 'react';
import { translate } from '../../translate/translate';
import { addCoin, toggleAddcoinModal } from '../../actions/actionCreators';
import Store from '../../store';
import AddCoinOptionsCrypto from './addcoinOptionsCrypto';
import AddCoinOptionsAC from './addcoinOptionsAC';
import AddCoinOptionsACFiat from './addcoinOptionsACFiat';

class AddCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoin: null,
      fullMode: {
        disabled: true,
        checked: false,
      },
      basiliskMode: {
        disabled: true,
        checked: false,
      },
      nativeMode: {
        disabled: true,
        checked: false,
      },
      mode: -2,
      display: false,
    };
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.updateSelectedMode = this.updateSelectedMode.bind(this);
    this.setNativeMode = this.setNativeMode.bind(this);
    this.setBasiliskMode = this.setBasiliskMode.bind(this);
    this.setFullMode = this.setFullMode.bind(this);
    this.activateCoin = this.activateCoin.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props) {
      this.setState(Object.assign({}, this.state, {
        display: props.display,
      }));
    }
  }

  updateSelectedCoin(e) {
    const coin = e.target.value.split('|');
    const defaultMode = coin[1];
    const modeToValue = {
      'full': 1,
      'basilisk': 0,
      'native': -1,
    };

    this.setState(Object.assign({}, this.state, {
      [e.target.name]: e.target.value,
      fullMode: {
        disabled: e.target.value.indexOf('full') > -1 ? false : true,
        checked: defaultMode === 'full' ? true : false,
      },
      basiliskMode: {
        disabled: e.target.value.indexOf('basilisk') > -1 ? false : true,
        checked: defaultMode === 'basilisk' ? true : false,
      },
      nativeMode: {
        disabled: e.target.value.indexOf('native') > -1 ? false : true,
        checked: defaultMode === 'native' ? true : false,
      },
      mode: modeToValue[defaultMode] !== undefined ? modeToValue[defaultMode] : -2,
    }));
  }

  updateSelectedMode(_value) {
    this.setState(Object.assign({}, this.state, {
      fullMode: {
        ...this.state.fullMode,
        checked: _value === '1' ? true : false,
      },
      basiliskMode: {
        ...this.state.basiliskMode,
        checked: _value === '0' ? true : false,
      },
      nativeMode: {
        ...this.state.nativeMode,
        checked: _value === '-1' ? true : false,
      },
      mode: _value,
    }));
  }

  setNativeMode() {
    this.updateSelectedMode('-1');
  }

  setBasiliskMode() {
    this.updateSelectedMode('0');
  }

  setFullMode() {
    this.updateSelectedMode('1');
  }

  /*handleForm(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({
      mode: '',
      selectedCoin: null,
    });
  }*/

  activateCoin() {
    Store.dispatch(addCoin(this.state.selectedCoin.split('|')[0], this.state.mode));
  }

  dismiss() {
    Store.dispatch(toggleAddcoinModal(false, false));
  }

  render() {
    return (
      <div>
        <div className={'modal modal-3d-sign add-coin-modal ' + (this.state.display ? 'show in' : 'fade hide')} id="AddCoinDilogModel-login" aria-hidden="true" aria-labelledby="AddCoinDilogModel-login" role="dialog" tabIndex="-1">
          <div className="modal-dialog modal-center modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-orange-a400 wallet-send-header">
                <button type="button" className="close white" data-dismiss="modal" aria-label="Close" onClick={this.dismiss}>
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title white">{translate('INDEX.SELECT_A_COIN')}</h4>
              </div>
              <div className="modal-body">
                <div className="col-sm-8">
                  <div className="form-group">
                    <select className="form-control form-material" name="selectedCoin" id="addcoin_select_coin_mdl_options-login" onChange={this.updateSelectedCoin}>
                      <option>{translate('INDEX.SELECT')}</option>
                      <AddCoinOptionsCrypto />
                      <AddCoinOptionsAC />
                      <AddCoinOptionsACFiat />
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <button type="button" className="btn btn-primary mdl_addcoin_done_btn-login" data-toggle="modal" data-dismiss="modal" id="mdl_addcoin_done_btn-login" onClick={this.activateCoin} disabled={this.state.mode === -2 }>{translate('INDEX.ACTIVATE_COIN')}</button>
                </div>
                <div className="col-sm-12 text-center">
                  <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
                    <input type="radio" className="to-labelauty labelauty" name="mode" id="addcoin_mdl_full_mode_login" disabled={this.state.fullMode.disabled} checked={this.state.fullMode.checked} />
                    <label htmlFor="addcoin_mdl_full_mode_login" onClick={this.setFullMode} style={{ pointerEvents: this.state.fullMode.disabled ? 'none' : 'all' }}>
                      <span className="labelauty-unchecked-image" style={{ display: this.state.fullMode.checked ? 'none' : 'inline-block' }}></span>
                      <span className="labelauty-unchecked" style={{ display: this.state.fullMode.checked ? 'none' : 'inline-block' }}>{translate('INDEX.FULL_MODE')}</span>
                      <span className="labelauty-checked-image" style={{ display: this.state.fullMode.checked ? 'inline-block' : 'none' }}></span>
                      <span className="labelauty-checked" style={{ display: this.state.fullMode.checked ? 'inline-block' : 'none' }}>{translate('INDEX.FULL_MODE')}</span>
                    </label>
                  </div>
                  <div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl-login">
                    <input type="radio" className="to-labelauty labelauty" name="mode" id="addcoin_mdl_basilisk_mode_login" disabled={this.state.basiliskMode.disabled} checked={this.state.basiliskMode.checked} />
                    <label htmlFor="addcoin_mdl_basilisk_mode_login" onClick={this.setBasiliskMode} style={{ pointerEvents: this.state.basiliskMode.disabled ? 'none' : 'all' }}>
                      <span className="labelauty-unchecked-image" style={{ display: this.state.basiliskMode.checked ? 'none' : 'inline-block' }}></span>
                      <span className="labelauty-unchecked" style={{ display: this.state.basiliskMode.checked ? 'none' : 'inline-block' }}>{translate('INDEX.BASILISK_MODE')}</span>
                      <span className="labelauty-checked-image" style={{ display: this.state.basiliskMode.checked ? 'inline-block' : 'none' }}></span>
                      <span className="labelauty-checked" style={{ display: this.state.basiliskMode.checked ? 'inline-block' : 'none' }}>{translate('INDEX.BASILISK_MODE')}</span>
                    </label>
                  </div>
                  <div className="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12 style-addcoin-lbl-mdl-login">
                    <input type="radio" className="to-labelauty labelauty" name="mode" id="addcoin_mdl_native_mode_login" disabled={this.state.nativeMode.disabled} checked={this.state.nativeMode.checked} />
                    <label htmlFor="addcoin_mdl_native_mode_login" onClick={this.setNativeMode} style={{ pointerEvents: this.state.nativeMode.disabled ? 'none' : 'all' }}>
                      <span className="labelauty-unchecked-image" style={{ display: this.state.nativeMode.checked ? 'none' : 'inline-block' }}></span>
                      <span className="labelauty-unchecked" style={{ display: this.state.nativeMode.checked ? 'none' : 'inline-block' }}>{translate('INDEX.NATIVE_MODE')}</span>
                      <span className="labelauty-checked-image" style={{ display: this.state.nativeMode.checked ? 'inline-block' : 'none' }}></span>
                      <span className="labelauty-checked" style={{ display: this.state.nativeMode.checked ? 'inline-block' : 'none' }}>{translate('INDEX.NATIVE_MODE')}</span>
                    </label>
                  </div>
                </div>
                <div className="col-sm-12">
                  <p>
                    <strong>{translate('INDEX.FULL_MODE')}:</strong> {translate('INDEX.FULL_MODE_DESC')}
                  </p>
                  <p>
                    <strong>{translate('INDEX.BASILISK_MODE')}:</strong> {translate('INDEX.BASILISK_MODE_DESC')}
                  </p>
                  <p>
                    <strong>{translate('INDEX.NATIVE_MODE')}:</strong> {translate('INDEX.NATIVE_MODE_DESC1')} <strong>Komodo Daemon</strong> {translate('INDEX.NATIVE_MODE_DESC2')} <i>Iguana Daemon</i> {translate('INDEX.NATIVE_MODE_DESC3')}.
                  </p>
                  <div className="alert alert-icon alert-primary" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <i className="icon md-info-outline" aria-hidden="true"></i> <strong>{translate('INDEX.NATIVE_MODE')}</strong> {translate('INDEX.NATIVE_MODE_DESC4')} <strong>{translate('INDEX.NATIVE_MODE_DESC5')}</strong>, <i>{translate('INDEX.NATIVE_MODE_DESC5')}</i>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'modal-backdrop ' + (this.state.display ? 'show in' : 'fade hide')}></div>
      </div>
    );
  }
}

export default AddCoin;
