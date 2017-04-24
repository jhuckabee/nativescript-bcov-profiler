import { View } from "ui/core/view";
export declare module com {
    module brightcove {
        module player {
            module event {
                const EventType: any;
            }
            module media {
                const DeliveryType: any;
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
export declare class BrightcovePlayer extends View {
    private _android;
    private frameLayout;
    private fragment;
    constructor();
    readonly android: any;
    readonly _nativeView: any;
    _createUI(): void;
    onUnloaded(): void;
}
export declare class PlayerFragment extends com.brightcove.player.view.BrightcovePlayerFragment {
    videoId: string;
    layout: any;
    brightcoveVideoView: any;
    onCreateView(inflater: any, container: any, savedInstanceState: any): any;
    onDestroyView(): void;
}
