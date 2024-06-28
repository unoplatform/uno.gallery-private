namespace Uno.Gallery;

using Uno.UI.Runtime.Skia.WebAssembly.Browser;
using Uno.UI.Xaml.Media;

public class Program
{
	public static async Task Main(string[] args)
	{
		var host = new PlatformHost(() => new App());
		await host.Run();
	}
}
