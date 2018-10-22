import './proxy';
import '../store/proxy';
import regeneratorRuntime from './regenerator';
import wx from './wx';

export default {
  regeneratorRuntime,
  ...wx,
}