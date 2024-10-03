using UIKit;
using Uno.UI.Runtime.Skia.AppleUIKit;

namespace Uno.Gallery
{
	public class EntryPoint
{
		// This is the main entry point of the application.
		static void Main(string[] args)
		{
#if !IS_UIKIT_SKIA
			// if you want to use a different Application Delegate class from "AppDelegate"
			// you can specify it here.
			UIApplication.Main(args, null, typeof(App));
#else
			var host = new PlatformHost(() => new App());
			await host.Run();
#endif
		}
	}
}
