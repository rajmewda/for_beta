import { MediaProvider } from './MediaContext.jsx';
import NowPlayingChip from '../components/NowPlayingChip.jsx';

/**
 * MediaProviderWithChip — wraps the app in the shared media manager
 * and pins the floating "▶ now playing" music chip on top while audio plays.
 */
export default function MediaProviderWithChip({ children }) {
  return (
    <MediaProvider>
      <NowPlayingChip />
      {children}
    </MediaProvider>
  );
}
