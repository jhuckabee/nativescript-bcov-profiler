import { View } from "ui/core/view";
import { PropertyMetadata } from "ui/core/proxy";
import { Property, PropertyMetadataSettings } from "ui/core/dependency-observable";
import * as app from "application";

export declare module com {
  module brightcove {
    module player {
      module event {
        const EventType;
      }
      module media {
        const DeliveryType;
      }
      module model {
        class Video {
          static createVideo(url: string, deliveryType: any): any;
        }
      }
      module view {
        class BrightcovePlayerFragment extends android.app.Fragment {
          fullScreen(): void;
        }
      }
    }
  }
}

export class BrightcovePlayer extends View {
  private _android: any;
  private frameLayout: any;
  private fragment: PlayerFragment;

  constructor() {
    super();
  }

  public get android(): any {
    return this._android;
  }

  public get _nativeView(): any {
    return this._android;
  }

  public _createUI() {
    console.log('BrightcovePlayer._createUI');
    this.frameLayout = new android.widget.FrameLayout(this._context);
    this.frameLayout.setLayoutParams(new android.widget.FrameLayout.LayoutParams(
        android.widget.FrameLayout.LayoutParams.MATCH_PARENT,
        android.widget.FrameLayout.LayoutParams.MATCH_PARENT
    ));
    this.frameLayout.setId(android.view.View.generateViewId());

    this.fragment = new PlayerFragment();
    let fragmentManager: android.app.FragmentManager = this._context.getFragmentManager();
    let fragmentTransaction: android.app.FragmentTransaction = fragmentManager.beginTransaction();
    fragmentTransaction.add(this.frameLayout.getId(), this.fragment);
    fragmentTransaction.commit();

    this._android = this.frameLayout;
  }

  public onUnloaded() {
    console.log('BrightcovePlayer.onUnloaded');
    let fragmentManager: android.app.FragmentManager = this._context.getFragmentManager();
    console.log('onUnloaded before commit')
    fragmentManager.beginTransaction().remove(this.fragment).commit();
    console.log('onUnloaded after commit')
    this.fragment = undefined;
    this._android = undefined;
  }
}

@JavaProxy("com.jhuckabee.bcovmemprof.PlayerFragment")
export class PlayerFragment extends com.brightcove.player.view.BrightcovePlayerFragment {
  videoId: string;
  layout: any;
  brightcoveVideoView: any;

  public onCreateView(inflater, container, savedInstanceState): any {
      console.log('PlayerFragment.onCreateView');
      let layoutId = this.getResources().getIdentifier("brightcove_player_fragment", "layout", container.getContext().getPackageName());
      this.layout = inflater.inflate(layoutId, container, false);
      let videoViewId = this.getResources().getIdentifier("brightcove_video_view", "id", container.getContext().getPackageName());
      this.brightcoveVideoView = this.layout.findViewById(videoViewId);
      super.onCreateView(inflater, container, savedInstanceState);

      // Setup with single MP4 video
      let video = com.brightcove.player.model.Video.createVideo("http://r5---sn-vgqs7ney.c.youtube.com/videoplayback?id=604ed5ce52eda7ee&itag=22&source=youtube&sparams=expire,id,ip,ipbits,mm,mn,ms,mv,pl,source&ip=2605:a000:1004:40ab:e4e6:4f4c:590f:e741&ipbits=0&expire=19000000000&signature=30EFAE36A4F533B16FD3B177A7531B7BF70142EB.5A1E73AE7AE882CB7842A89786F3E0CDC8D43ACB&key=cms1&cms_redirect=yes&mm=31&mn=sn-vgqs7ney&ms=au&mt=1493045070&mv=m&pl=32", com.brightcove.player.media.DeliveryType.MP4);
      this.brightcoveVideoView.add(video);

      return this.layout;
  }

  public onDestroyView() {
      console.log('PlayerFragment.onDestroyView');
      this.brightcoveVideoView.stopPlayback();
      this.brightcoveVideoView.clear();

      // https://brightcovelearning.github.io/Brightcove-API-References/android-sdk/javadoc/com/brightcove/player/display/VideoDisplayComponent.html
      // Says: EventType.STOP: stops the video and destroys the player
      this.brightcoveVideoView.getVideoDisplay().getEventEmitter().emit(com.brightcove.player.event.EventType.STOP);

      // https://groups.google.com/forum/#!searchin/brightcove-native-player-sdks/android$2C$20memory%7Csort:relevance/brightcove-native-player-sdks/t4n6FvdgvMs/vxzL5aIiXRUJ
      // this.brightcoveVideoView.getEventEmitter().off()

      super.onDestroyView();
  }

}
